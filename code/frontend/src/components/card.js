import PropTypes from "prop-types";
import React, { Component } from "react";
import NewCard from "react-bootstrap/Card";
import Slideshow from "./Slideshow.js";
import Reviews from "./Reviews";
import "../App.css";
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing(2),
  },
});

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
    const restaurantLocation =
      restaurant.location["address1"] == undefined
        ? ""
        : restaurant.location["address1"];
    const cuisineType = restaurant.categories[0]["title"];
    const rating = restaurant.rating;
    const reviewCount = restaurant.review_count;
    const webUrl = restaurant.url;
<<<<<<< HEAD
    const photos = restaurant.photos;
    let reviews = restaurant.reviews;
=======
    const photos = (restaurant.photos === undefined) ? ["", "", ""] : restaurant.photos;
    const {classes} = this.props;
    this.checkArrayElements(photos);
    var reviews = restaurant.reviews;
>>>>>>> main
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
    let emptyListReviews = ["", "", ""];
    let emptyListPhotos = ["", "", ""];

    return (
      <NewCard style={{ justify: "center" }}>
        <NewCard.Body>
<<<<<<< HEAD
          <Slideshow photos={photos} reviews={emptyListReviews} isImg={true} />
          <Slideshow photos={emptyListPhotos} reviews={reviews} />
=======
          <Slideshow photos={photos}/>
          <Reviews reviews={reviews}/>
>>>>>>> main
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
            <IconButton className={classes.button}
              onClick={this.props.onLike}
            >
              <FavoriteBorder
                style={{fontSize:64,
                color: "#fc4c4e"}}
              />
            </IconButton>
            <IconButton className={classes.button}
              onClick={this.props.onDislike}
            >
              <NotInterestedIcon
                  style={{fontSize:64}}
              />
            </IconButton>
          </div>
        </NewCard.Body>
      </NewCard>
    );
  }
}

export default withStyles(styles)(Card);

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
  classes: PropTypes.object.isRequired,
};
