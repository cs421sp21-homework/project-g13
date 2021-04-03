import PropTypes from "prop-types";
import React, { Component } from "react";
import NewCard from "react-bootstrap/Card";
import Slideshow from "./Slideshow.js";
import "../App.css";

class Card extends Component {
  onKeyPressed(event) {
    if (event.key === "ArrowLeft") {
      this.props.onLike();
    }
    if (event.key === "ArrowRight") {
      this.props.onDislike();
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", this.onKeyPressed.bind(this));
  }

  checkArrayElements(array) {
    for (let i=0; i<array.length; i++) {
      if (array[0]=== undefined || array[0] == null) {
        array[0] = "";
      }
    }
  }

  render() {
    const { restaurant } = this.props;
    const restaurantLocation = (restaurant.location["address1"] == undefined) ? "" : restaurant.location["address1"];
    const cuisineType = restaurant.categories[0]["title"];
    const rating = restaurant.rating;
    const reviewCount = restaurant.review_count;
    const webUrl = restaurant.url;
    const photos = (restaurant.photos === undefined) ? ["", "", ""] : restaurant.photos;

    this.checkArrayElements(photos);
    var reviews = restaurant.reviews;
    if (reviews == undefined) {
      reviews = [];
      for (let i = 0; i < 3; i++) {
        reviews[i] = "";
      }
    }
    for (let i = 0; i < 3; i++) {
      if (reviews[i] == undefined) {
        reviews[i] = "";
      }
    }

    return (
      <NewCard style={{ justify: "center" }}>
        <NewCard.Body>
          <Slideshow photos={photos} reviews={reviews} />
          <NewCard.Title style={{ fontSize: "3vh" }}>
            {restaurant.name}
          </NewCard.Title>
          <NewCard.Subtitle style={{ fontSize: "2vh" }}>
            {cuisineType} {restaurant.price}
          </NewCard.Subtitle>
          <NewCard.Text style={{ fontSize: "2vh" }}>
            {rating} stars from {reviewCount} reviews
          </NewCard.Text>
          <NewCard.Text style={{ fontSize: "2vh" }}>
            {restaurantLocation}
          </NewCard.Text>
          <NewCard.Subtitle>
            <a href={webUrl}>Website</a>
          </NewCard.Subtitle>
          <div className="like-dislike-container">
            <button
              className="like-dislike-button float-left red"
              onClick={this.props.onLike}
            >
              <i className="fas fa-heart" />
            </button>
            <button
              className="like-dislike-button float-right"
              onClick={this.props.onDislike}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </NewCard.Body>
      </NewCard>
    );
  }
}

export default Card;

Card.propTypes = {
  restaurant: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review_count: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        alias: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    location: PropTypes.shape({
      address1: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onDislike: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
};
