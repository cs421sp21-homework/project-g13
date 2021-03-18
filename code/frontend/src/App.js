import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router-dom";
import ListRestaurant from "./ListRestaurant.js";
import InputLocation from "./InputLocation.js";
import * as api from "./Api.js"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
    };
  }

  setRestaurants = (restaurants) => {
      this.setState({restaurants: restaurants});
      this.props.history.push("/ListRestaurants");
  }

  createGroup = (restaurants, location, radius) => {
      api.postGroup().then((response) => {
          api.postUser(radius, "dummy", location, response.group_id).then((resp) => {
              console.log(resp);
          });
          });
      this.setRestaurants(restaurants);
  }

  getFromGroupID = (id) => {
      api.getGroupMembers(id).then((response) => {
         api.getRestaurants(response[0].loc, response[0].userName).then((resp) => {
             this.setRestaurants(resp)
         })
      });

  }


  render() {
    return (
      <Switch>
        <Route exact path="/">
          <InputLocation
              onSubmit = {this.createGroup}
          />
        </Route>
        <Route path="/ListRestaurants">
          <ListRestaurant
              restaurants={this.state.restaurants}
          />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(App);
