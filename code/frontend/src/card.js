import PropTypes from "prop-types";
import React, { Component } from "react";
import "./App.css";

class Card extends Component {

  render() {

    const {restaurant} = this.props;

    return (
      <div className="card-body">
        <div className="restaurant-image" style={{
          backgroundImage: `url(${restaurant.backgroundImage})`,
        }}/>
        <div className="restaurant-info">
          <div className="column-50">
            <h1 className="font-helvetica restaurant-name float-left">
              {restaurant.restaurant_name}
            </h1>
            <div className="clearfix no-margin"> </div>
            <h2 className="font-helvetica restaurant-cuisine float-left">
              {restaurant.cuisine}
            </h2>
          </div>
          
          <div className="column-50">
          <h2 className="font-helvetica restaurant-price-range float-right">
            {restaurant.price_range}
          </h2>
          <div className="clearfix no-margin"> </div>
          <h3 className="font-helvetica restaurant-location float-right">
            {restaurant.location}
          </h3>
          </div>
        </div>

        <div className="like-dislike-container">
          <button className="like-dislike-button float-left red">
            <i className="fas fa-heart"/>
          </button>
          <button className="like-dislike-button float-right" onClick={this.props.onDislike}>
            <i className="fas fa-times"/>
          </button>
        </div>
      </div>
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
