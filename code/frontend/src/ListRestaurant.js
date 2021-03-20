import "./App.css";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "./card.js";
import MatchFound from "./MatchFound";
import NotFound from "./NotFound"


class ListRestaurant extends Component {
    state = {
        position: 0,
        match: null,
    }

    nextRestaurant = () => {
        if (this.state.position < 20 &&
            this.state.position + 1 < this.props.restaurants.length) {
            this.setState({position: this.state.position + 1});
        } else {
            this.state.position = -1;
            this.props.history.push('/Location/ListRestaurants/NotFound')
        }
    }



  render() {
        if (this.state.position != -1) {
            let data = this.props.location.state;
            const restaurants = data.restaurants;
            return (
                    <Route path="/Location/ListRestaurants">
                        <div className="App-header">
                            <Card
                                restaurant={restaurants[this.state.position]}
                                onDislike={this.nextRestaurant}
                                onLike={() => {
                                    this.state.match = restaurants[this.state.position];
                                    this.state.position = -1;
                                    this.props.history.push('/Location/ListRestaurants/Found');
                                }}
                            />
                        </div>
                    </Route>
            );
        }
        return (
            <Switch>
                <Route path="/Location/ListRestaurants/Found">
                    <MatchFound restaurant={this.state.match}/>
                </Route>
                <Route path="/Location/ListRestaurants/NotFound">
                    <NotFound/>
                </Route>
            </Switch>
        )
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
