import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router-dom";
import ListRestaurant from "./ListRestaurant.js";
import * as api from "./Api.js";

class App extends Component {
  componentDidMount() {
    api.getRestaurants().then((response) => this.setState({restaurants: response.data.restaurants}));
  }

  constructor(props) {
    super(props);
    this.state = {
      address: "",
      suiteNum: "",
      city: "",
      state: "",
      zipcode: "",
      restaurants: [],
    };
  }

  myChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

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
                <input
                  type="button"
                  value="Submit"
                  onClick={() =>
                    this.props.history.push("/ListRestaurants", this.state)
                  }
                />
              </form>
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
