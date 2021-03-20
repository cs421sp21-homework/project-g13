import React, { Component } from "react";
import { Route, Switch, useParams } from "react-router";
import { withRouter } from "react-router-dom";
import ListRestaurant from "./ListRestaurant.js";
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
      radius: "",
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

  validInput = () => {
    if (this.state.address === "" || this.state.city === "" ||
        this.state.state === "" || this.state.zipcode === "") {
      this.setState({statusMessage: "Please enter all required fields."});
      return false;
    }
    if (this.state.radius === "") {
      this.setState({statusMessage: "Error: Search radius must be a number."});
      return false;
    }
    if (this.state.radius > 25) {
      this.setState({statusMessage: "Error: Maximum search radius is 25 miles."});
      return false;
    }
    if (this.state.radius <= 0) {
      this.setState({statusMessage: "Error: Search radius must be greater than 0."});
      return false;
    }
    return true;
  }

  milesToMeters = (miles) => {
    return Math.round(miles * 1609.34);
  }

  submit = () => {
    this.setState({ statusMessage: "Loading..." });
    if (this.validInput()) {
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
                <br/>
                <h1>Search for restaurants within: </h1>
                <input
                    type="number"
                    name="radius"
                    max={25}
                    min={0.5}
                    step={0.5}
                    defaultValue={25}
                    onChange={this.myChangeHandler}
                />
                miles
                <br/>
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
          </div>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(Location);
