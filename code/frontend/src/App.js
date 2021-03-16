import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router-dom";
import ListRestaurant from "./ListRestaurant.js";
import * as api from "./Api.js"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      suiteNum: "",
      city: "",
      state: "",
      zipcode: "",
      radius: 25,
      restaurants: [],
      statusMessage: "",
    };
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
    this.setState({statusMessage: "Loading..."});
    if (this.validInput()) {
      api.getRestaurants(`${this.state.address} ${this.state.suiteNum} 
        ${this.state.city} ${this.state.state} ${this.state.zipcode}`,
          this.milesToMeters(this.state.radius))
          .then((response) => {
            if (response[0] === "err") {
              this.setState({statusMessage: "Error: Location not recognized by Yelp."});
            } else if (response.length === 0) {
              this.setState({statusMessage: "Error: No results found. Try broadening your search radius."});
            } else {
              this.setState({restaurants: response});
              this.props.history.push("/ListRestaurants", this.state);
            }
          });
    }
  }



  render() {
    return (
      <Switch>
        <Route exact path="/">
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
                <input
                  type="button"
                  value="Submit"
                  onClick={() => {this.submit()}}
                />
              </form>
              <div className="status">
                {this.state.statusMessage}
              </div>
            </header>
          </div>
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
