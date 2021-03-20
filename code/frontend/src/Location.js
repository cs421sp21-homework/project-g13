import React, { Component } from "react";
import { Route, Switch, useParams } from "react-router";
import { withRouter } from "react-router-dom";
import ListRestaurant from "./ListRestaurant.js";
import GroupPage from "./GroupPage.js";
import RoomCheck from "./RoomCheck.js";
import * as api from "./Api.js";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      suiteNum: "",
      city: "",
      state: "",
      zipcode: "",
      restaurants: [],
      statusMessage: "",
    };
  }

  componentDidMount() {
    console.log("opened set location page");
    this.returnTo = this.props.match.params.returnTo;
    console.log(this.returnTo);
    //this.setState({ statusMessage: this.returnTo });
  }

  myChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submit = () => {
    this.setState({ statusMessage: "Loading..." });
    if (
      this.state.address === "" ||
      this.state.city === "" ||
      this.state.state === "" ||
      this.state.zipcode === ""
    ) {
      this.setState({ statusMessage: "Please enter all required fields." });
    } else {
      var locationString = `${this.state.address} ${this.state.suiteNum} 
      ${this.state.city} ${this.state.state} ${this.state.zipcode}`;
      
      if (this.returnTo !== undefined && this.returnTo !== "") {
        this.props.history.push("/Host/"+locationString);
      } else {
        api
        .getRestaurants(locationString)
        .then((response) => {
          if (response[0] === "err") {
            this.setState({
              statusMessage: "Error: Location not recognized by Yelp.",
            });
          } else {
            this.setState({ restaurants: response });
            this.props.history.push("/Location/ListRestaurants", this.state);
          }
        });
      }
    }
  };

  render() {
    return (
      <Switch>
        <Route path="/Location/ListRestaurants">
          <ListRestaurant restaurants={this.state.restaurants} />
        </Route>
        <Route path="/Location">
          <div className="App">
            <header className="App-header">
              <form>
                <h1>Please enter your Location:</h1>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={this.myChangeHandler}
                />
                <input
                  type="text"
                  name="suiteNum"
                  placeholder="Suite Number (optional)"
                  onChange={this.myChangeHandler}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={this.myChangeHandler}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={this.myChangeHandler}
                />
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zip Code"
                  onChange={this.myChangeHandler}
                />
                <br />
                <input
                  type="button"
                  value="Submit"
                  onClick={() => {
                    this.submit();
                  }}
                />
              </form>
              <div className="status">{this.state.statusMessage}</div>
            </header>
            <body>
              <button>Create a Group</button>
            </body>
          </div>
        </Route>
        <Route path="/Groups">
          <GroupPage />
        </Route>
        <Route path="/RoomCheck">
          <RoomCheck />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(Location);
