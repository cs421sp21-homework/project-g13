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
    let data = this.props.location.state;

    const restaurants = data.restaurants;

    return (
      <div className="App-header">
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
            name: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            review_count: PropTypes.number.isRequired,
            reviews: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    rating: PropTypes.number.isRequired,
                }).isRequired,
            ).isRequired,
            location: PropTypes.shape({
                address1: PropTypes.string.isRequired,
            }).isRequired,
            categories: PropTypes.arrayOf(
                PropTypes.shape({
                    alias: PropTypes.string.isRequired,
                    title: PropTypes.string.isRequired,
                }).isRequired,
            ).isRequired,
            photos: PropTypes.arrayOf(
                PropTypes.string.isRequired,
            ).isRequired,
        }).isRequired,
    ).isRequired,
};
