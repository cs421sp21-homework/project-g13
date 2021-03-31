import React, { Component } from "react";
import { Route, Switch, useParams } from "react-router";
import { withRouter } from "react-router-dom";
import SetLocation from "../components/SetLocation.js"
import Card from "../components/card.js"
import MatchFound from "../components/MatchFound.js"
import NotFound from "./NotFound.js"
import * as api from "../api/Api.js";

class Individual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "set_location",
      restaurants: [],
      statusMessage: "",
      useParentStatus: false,
      currentRestaurantIndex: 0,
    };
    this.restaurants = [];
    this.set_location_page = React.createRef();

    this.onDislikeRestaurant = this.onDislikeRestaurant.bind(this);
    this.onLikeRestaurant = this.onLikeRestaurant.bind(this);
  }

  onSetLocation(location, radius) {
    api.getRestaurants(location, radius).then((response) => {
      if (response.length === 0 || response[0] === "err") {
        this.set_location_page.current.setStatusMessage("Error: Location not recognized by Yelp.");
      } else {
        this.restaurants = response;
        this.setState({page: "show_restaurant"});
      }
    });
  }

  onBack() {
    this.props.history.push("/");
  }

  onDislikeRestaurant() {
    if (this.state.currentRestaurantIndex + 1 < this.restaurants.length) {
        this.setState({currentRestaurantIndex: this.state.currentRestaurantIndex+1});
    } else {
        //go to no match found page
        this.setState({page: "no_match_found"});
    }
  }

    onLikeRestaurant() {
        this.setState({page: "match_found"});
    }
  
  render() {
    const page = this.state.page;
    return (
          <div>
              { page === "set_location" &&
                <SetLocation onSubmit={(location, radius) => this.onSetLocation(location, radius)} 
                    onBack={() => this.onBack()} ref={this.set_location_page}
                />
              }

              { page === "show_restaurant" && 
                <div className="App-header">
                <Card
                  restaurant={this.restaurants[this.state.currentRestaurantIndex]}
                  onDislike={this.onDislikeRestaurant}
                  onLike={this.onLikeRestaurant}
                />
                </div>
              }

                { page === "match_found" &&
                    <MatchFound  restaurant={this.restaurants[this.state.currentRestaurantIndex]} 
                    onDone={() => this.props.history.push("/")} />
                }

                { page === "no_match_found" &&
                    <NotFound onTryAgain={() => this.setState({currentRestaurantIndex: 0, page: "show_restaurant"})} />
                }
          </div>
    );
  }
}

export default withRouter(Individual);
