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
            restaurant_name: PropTypes.string.isRequired,
            price_range: PropTypes.string.isRequired,
            cuisine: PropTypes.string.isRequired,
            backgroundImage: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
};
