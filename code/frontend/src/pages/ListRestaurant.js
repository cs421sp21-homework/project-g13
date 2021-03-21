import "../App.css";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "../components/card.js";
import MatchFound from "./MatchFound";
import NotFound from "./NotFound";
import io from "socket.io-client";

class ListRestaurant extends Component {
  constructor(props) {
    super(props);
    this.isGroup = this.props.location.state.isGroup;
    console.log("Group " + this.isGroup);
    this.state = {
      position: 0,
      match: null,
    };

    var roomId = sessionStorage.getItem("roomId");
    if (this.isGroup && roomId != null) {
      //start socket.io
      this.socket = io("http://localhost:4000", {
        withCredentials: true,
      });
      this.socket.on("match_found", (data) => this.onMatchFound(data));
      this.room = roomId;
      console.log(this.room);
      this.socket.emit("join_room", this.room);

      console.log("got socket");
    }
  }

  onMatchFound(restaurant) {
    if (restaurant != null && restaurant !== "") {
      //search for restaurant with same id
      let data = this.props.location.state;
      const restaurants = data.restaurants;

      for (var i = 0; i < restaurants.length; i++) {
        if (restaurants[i] != null && restaurants[i].id === restaurant) {
          this.state.position = i;
          break;
        }
      }
    }
  }

  onLike() {


  }

  nextRestaurant = () => {
    console.log("below");
    console.log(this.props.location.state.restaurants.length);
    if (
      this.state.position < 20 &&
      this.state.position + 1 < this.props.location.state.restaurants.length
    ) {
      this.setState({ position: this.state.position + 1 });
    } else {
      this.state.position = -1;
      this.props.history.push("/Location/ListRestaurants/NotFound");
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
                if (this.isGroup != null && this.isGroup) {
                  this.socket.emit("vote", {room: this.room, restaurantId: restaurants[this.state.position].id});
                  this.nextRestaurant();
                  console.log("voted for restaurant");
                } else {
                  this.state.match = restaurants[this.state.position];
                  this.state.position = -1;
                  this.props.history.push("/Location/ListRestaurants/Found");
                }
                
              }}
            />
          </div>
        </Route>
      );
    }
    return (
      <Switch>
        <Route path="/Location/ListRestaurants/Found">
          <MatchFound restaurant={this.state.match} />
        </Route>
        <Route path="/Location/ListRestaurants/NotFound">
          <NotFound />
        </Route>
      </Switch>
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
        }).isRequired
      ).isRequired,
      location: PropTypes.shape({
        address1: PropTypes.string.isRequired,
      }).isRequired,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          alias: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
      photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired
  ).isRequired,
};
