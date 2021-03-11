import PropTypes from "prop-types";
import React, { Component } from "react";
import NewCard from 'react-bootstrap/Card';
import Slideshow from './Slideshow.js';
import "./App.css";

class Card extends Component {

  render() {

    const {restaurant} = this.props;

    const restaurantLocation = restaurant.location['address1'];
    const cuisineType = restaurant.categories[0]['title'];
    const rating = restaurant.rating;
    const reviewCount = restaurant.review_count;
    const webUrl = restaurant.url;
    const photos = restaurant.photos;
    const reviews = restaurant.reviews;



    return (
      <NewCard style = {{justify: 'center'}}>
        <NewCard.Body>
          <Slideshow
            photos = {photos}
            reviews = {reviews}
          />
          <NewCard.Title style = {{fontSize: '3vh'}}>{restaurant.name}</NewCard.Title>
          <NewCard.Subtitle style = {{fontSize: '2vh'}}>{cuisineType} {restaurant.price}</NewCard.Subtitle>
          <NewCard.Text style = {{fontSize: '2vh'}}>
            {rating} from {reviewCount} reviews
          </NewCard.Text>
          <NewCard.Text style = {{fontSize: '2vh'}}>
            {restaurantLocation}
          </NewCard.Text>
          <NewCard.Subtitle>
            {webUrl}
          </NewCard.Subtitle>
          <div className="like-dislike-container">
            <button className="like-dislike-button float-left red">
              <i className="fas fa-heart"/>
            </button>
            <button className="like-dislike-button float-right" onClick={this.props.onDislike}>
              <i className="fas fa-times"/>
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
    restaurant_name: PropTypes.string.isRequired,
    price_range: PropTypes.string.isRequired,
    cuisine: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  onDislike: PropTypes.func.isRequired,
};
