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
      api.postGroup().then((resp) => {
          alert("Group id:" + resp.group_id);
          api.postUser(resp.group_id, resp.group_id, location + "@" + radius, resp.group_id).then((response) => {
              this.setRestaurants(restaurants);
          });
      });
  }

  getFromGroupID = (id) => {
      api.getGroupMembers(id).then((response) => {
          console.log(response[0]);
          const fields = response[0].loc.split('@');
         api.getRestaurants(fields[0], fields[1]).then((resp) => {
             this.setRestaurants(resp);
         })
      });

  }

  render() {
    return (
      <Switch>
          <Route exact path="/">
              <InputLocation
                  onSubmit = {this.setRestaurants}
              />
          </Route>
        <Route exact path="/group">
            <button onClick={() => {
                const id = prompt("Enter group id:");
                this.getFromGroupID(id);
            }}>Join a group</button>
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
