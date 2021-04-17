import PropTypes from "prop-types";
import React, { Component } from "react";
import NewCard from "react-bootstrap/Card";
import Slideshow from "./Slideshow.js";
import "../App.css";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(2),
  },
});

class Card extends Component {
  constructor(props) {
    super(props);
    this.cardType =
      this.props.cardType === undefined || this.props.cardType === null
        ? "regular"
        : this.props.cardType;
  }

  onKeyPressed(event) {
    if (event.key === "ArrowLeft" && this.cardType === "regular") {
      this.props.onLike();
    }
    if (event.key === "ArrowRight" && this.cardType === "regular") {
      this.props.onDislike();
    }
  }

  componentDidMount() {
    if (this.cardType === "regular") {
      document.addEventListener("keyup", this.onKeyPressed.bind(this));
    }
  }

  checkArrayElements(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[0] === undefined || array[0] == null) {
        array[0] = "";
      }
    }
  }

  checkUndefinedOrNull(restaurant) {
    //console.log("restaurant");
    //console.log(restaurant);
    if (restaurant === undefined || restaurant === null) {
      return this.getBlankRestaurant();
    } else {
      if (restaurant.name === undefined || restaurant.name === null)
        restaurant.name = "";
      if (restaurant.price === undefined || restaurant.price === null)
        restaurant.price = "";
      if (restaurant.rating === undefined || restaurant.rating === null)
        restaurant.rating = "";
      if (
        restaurant.review_count === undefined ||
        restaurant.review_count === null
      )
        restaurant.review_count = "";
      if (restaurant.url === undefined || restaurant.url === null)
        restaurant.url = "";

      if (restaurant.location === undefined || restaurant.location === null)
        restaurant.location = { address1: "" };
      if (
        restaurant.location["address1"] === undefined ||
        restaurant.location["address1"] === null
      )
        restaurant.location = { address1: "" };

      if (restaurant.categories === undefined || restaurant.categories === null)
        restaurant.categories = [{ title: "" }];
      if (
        restaurant.categories[0] === undefined ||
        restaurant.categories[0] === null
      )
        restaurant.categories[0] = { title: "" };
      if (
        restaurant.categories[0]["title"] === undefined ||
        restaurant.categories[0]["title"] === null
      )
        restaurant.categories[0] = { title: "" };

      if (restaurant.photos === undefined || restaurant.photos === null)
        restaurant.photos = ["", "", ""];
      if (restaurant.reviews === undefined || restaurant.reviews === null)
        restaurant.reviews = [{ text: "" }, { text: "" }, { text: "" }];
      for (var i = 0; i < 3; i++) {
        if (restaurant.photos[i] === undefined || restaurant.photos[i] === null)
          restaurant.photos[i] = "";
        if (
          restaurant.reviews[i] === undefined ||
          restaurant.reviews[i] === null
        )
          restaurant.reviews[i] = { text: "" };
        if (
          restaurant.reviews[i]["text"] === undefined ||
          restaurant.reviews[i]["text"] === null
        )
          restaurant.reviews[i] = { text: "" };
        if (
          restaurant.reviews[i]["url"] === undefined ||
          restaurant.reviews[i]["url"] === null
        )
          restaurant.reviews[i] = { url: "" };
      }
      return restaurant;
    }
  }

  getBlankRestaurant() {
    return {
      name: "",
      location: { address1: "" },
      categories: [{ title: "" }],
      price: "",
      rating: "",
      review_count: "",
      url: "",
      photos: ["", "", ""],
      reviews: [{ text: "" }, { text: "" }, { text: "" }],
    };
  }

  render() {
    const cardType = this.cardType;

    var { restaurant, classes } = this.props;
    restaurant = this.checkUndefinedOrNull(restaurant);
    const restaurantLocation = restaurant.location["address1"];
    const cuisineType = restaurant.categories[0]["title"];
    const rating = restaurant.rating;
    const reviewCount = restaurant.review_count;
    const webUrl = restaurant.url;
    const photos = restaurant.photos;
    let reviews = restaurant.reviews;

    console.log("reviews");
    console.log(reviews);

    return (
      <NewCard
        style={{
          justify: "center",
          overflow: "hidden",
          backgroundColor: "transparent",
          border: 0,
        }}
      >
        <NewCard.Body>
          <Slideshow photos={photos} isImg={true} />
          <Slideshow reviews={reviews} isImg={false} />
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

          {cardType === "regular" && (
            <div className="like-dislike-container">
              <IconButton
                className={classes.button}
                onClick={this.props.onLike}
              >
                <FavoriteBorder style={{ fontSize: 64, color: "#fc4c4e" }} />
              </IconButton>
              <IconButton
                className={classes.button}
                onClick={this.props.onDislike}
              >
                <NotInterestedIcon style={{ fontSize: 64 }} />
              </IconButton>
            </div>
          )}
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
