import "./App.css";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import Card from "./card.js";
import PropTypes from "prop-types";


class ListRestaurant extends Component {
    state = {
        position: 0,
    }

    nextRestaurant = () => {
        if (this.state.position + 1 < this.props.restaurants.length) {
            this.setState({position: this.state.position + 1});
        }
    }

  render() {
    const data = this.props.location.state;
    let location = Object.values(data);
    let locationString = "";

    for (let i = 0; i < location.length; i++) {
      locationString += location[i];
      if (i < location.length - 1) {
        locationString += ", ";
      }
    }

    const restaurants = this.props.restaurants;
    return (
      <div className="App-header">
        <h1>{locationString}</h1>
        <Card
            restaurant={restaurants[this.state.position]}
            onDislike={this.nextRestaurant}
        />
      </div>
    );
  }
}

export default withRouter(ListRestaurant);

ListRestaurant.propTypes = {
    restaurants: PropTypes.arrayOf(
        PropTypes.shape({
            restaurant_name: PropTypes.string.isRequired,
            price_range: PropTypes.string.isRequired,
            cuisine: PropTypes.string.isRequired,
            backgroundImage: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};
