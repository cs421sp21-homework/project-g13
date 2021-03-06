import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router-dom";
import ListRestaurant from "./ListRestaurant.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      suiteNum: "",
      city: "",
      state: "",
      zipcode: "",
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
              restaurants={[
                {
                  restaurant_name: "FFC",
                  price_range: "$$",
                  cuisine: "American",
                  backgroundImage: "https://www.ashton-design.com/case-study/readco/img/projects/JohnsHopkins/0511_FreshFoodCafe/0511_editedExterior.jpg",
                  location: "AMR II",
                },
                {
                  restaurant_name: "Restaurant2",
                  price_range: "$$$",
                  cuisine: "Not American",
                  backgroundImage: "https://www.kaneconstruction.com/wp-content/uploads/2017/04/170302_407-for-Web.jpg",
                  location: "Wolman",
                }
              ]}

          />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(App);
