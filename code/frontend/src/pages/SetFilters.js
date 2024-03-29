import "../App.css";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as api from "../api/Api.js";

class SetFilters extends Component {
  constructor(props) {
    super(props);
    this.cuisineOptions = [
      {
        key: "tradamerican",
        text: "American (traditional)",
        value: "tradamerican",
      },
      { key: "newamerican", text: "American (new)", value: "newamerican" },
      { key: "mexican", text: "Mexican", value: "mexican" },
      { key: "Chinese", text: "Chinese", value: "Chinese" },
      { key: "Greek", text: "Greek", value: "Greek" },
    ];

    this.priceOptions = [
      { key: "$", text: "$", value: "$" },
      { key: "$$", text: "$$", value: "$$" },
      { key: "$$$", text: "$$$", value: "$$$" },
      { key: "$$$$", text: "$$$$", value: "$$$$" },
      { key: "$$$$$", text: "$$$$$", value: "$$$$$" },
    ];

    this.ratingOptions = [
      { key: "1", text: "★", value: 1 },
      { key: "2", text: "★★", value: 2 },
      { key: "3", text: "★★★", value: 3 },
      { key: "4", text: "★★★★", value: 4 },
      { key: "5", text: "★★★★★", value: 5 },
    ];

    if (this.props.filters != null) {
      const prices = this.props.filters.get("prices");
      const cuisines = this.props.filters.get("cuisines");
      const ratings = this.props.filters.get("ratings");
      const kosher = this.props.filters.get("kosher");
      const vegan = this.props.filters.get("vegan");
      const vegetarian = this.props.filters.get("vegetarian");

      // long-term preferences from database
      const trueKosher = this.props.filters.get("kosher");
      const trueVegan = this.props.filters.get("vegan");
      const trueVegetarian = this.props.filters.get("vegetarian");

      this.state = {
        prices: prices == null ? [] : prices,
        cuisines: cuisines == null ? [] : cuisines,
        ratings: ratings == null ? [] : ratings,
        kosher: kosher == null ? false : kosher,
        vegan: vegan == null ? false : vegan,
        vegetarian: vegetarian == null ? false : vegetarian,
        trueKosher: trueKosher == null ? false : trueKosher,
        trueVegan: trueVegan == null ? false : trueVegan,
        trueVegetarian: trueVegetarian == null ? false : trueVegetarian,
      };

      let currUser = localStorage.getItem("username");
      if (currUser !== null) {
        api.getUserPreference(currUser).then((response) => {
          if (typeof response === "undefined") {
            //return "none";
            alert("Error trying to preset filters");
            this.props.history.push("/");
          } else {
            //alert("Preferences stored!");

            this.state.trueKosher = response.includes("kosher");
            this.state.kosher = this.state.trueKosher;
            this.state.trueVegetarian = response.includes("vegetarian");
            this.state.vegetarian = this.state.trueVegetarian;
            this.state.trueVegan = response.includes("vegan");
            this.state.vegan = this.state.trueVegan;

            //return response;
          }
        });
      }
    } else {
      this.state = {
        prices: [],
        cuisines: [],
        ratings: [],
        kosher: false,
        vegan: false,
        vegetarian: false,
        trueKosher: trueKosher == null ? false : trueKosher,
        trueVegan: trueVegan == null ? false : trueVegan,
        trueVegetarian: trueVegetarian == null ? false : trueVegetarian,
      };
    }

    this.checkboxChangeHander = this.checkboxChangeHander.bind(this);
  }

  onSubmit() {
    //check values
    this.props.filters.set("prices", this.state.prices);
    this.props.filters.set("cuisines", this.state.cuisines);
    this.props.filters.set("ratings", this.state.ratings);

    // ensuring that database preferences override whatever the user chooses here
    if (this.state.trueKosher === true) {
      this.state.kosher = true;
    }
    if (this.state.trueVegan === true) {
      this.state.vegan = true;
    }
    if (this.state.trueVegetarian === true) {
      this.state.vegetarian = true;
    }

    this.props.filters.set("kosher", this.state.kosher);
    this.props.filters.set("vegan", this.state.vegan);
    this.props.filters.set("vegetarian", this.state.vegetarian);
    //this.props.filters.set("lactose", this.state.lactose);

    console.log("filters");
    console.log(this.props.filters);

    this.props.onSubmit();
  }

  onPricesChange(event, data) {
    console.log(data);
    this.setState({ prices: data.value });
  }

  onCuisineChange(event, data) {
    this.setState({ cuisines: data.value });
  }

  onRatingChange(event, data) {
    this.setState({ ratings: data.value });
  }

  checkboxChangeHander(event) {
    event.persist();
    const checked = event.target.checked;
    this.setState({
      [event.target.name]: checked,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="filter-content">
          <h1 className="filter-header">Let's narrow down your search:</h1>

          <h2 className="float-left filter-subheader">Cuisine</h2>
          <div className="clearfix"></div>

          <Dropdown
            placeholder="Cuisine"
            fluid
            multiple
            selection
            options={this.cuisineOptions}
            className="filter-dropdown"
            value={this.state.cuisines}
            onChange={(event, data) => this.onCuisineChange(event, data)}
          />

          <h2 className="float-left filter-subheader">Price</h2>
          <div className="clearfix"></div>
          <Dropdown
            placeholder="Price"
            fluid
            multiple
            selection
            options={this.priceOptions}
            className="filter-dropdown"
            value={this.state.prices}
            onChange={(event, data) => this.onPricesChange(event, data)}
          />

          <h2 className="float-left filter-subheader">Rating</h2>
          <div className="clearfix"></div>
          <Dropdown
            placeholder="Rating"
            fluid
            multiple
            selection
            options={this.ratingOptions}
            className="filter-dropdown"
            value={this.state.ratings}
            onChange={(event, data) => this.onRatingChange(event, data)}
          />

          <h2 className="float-left filter-dietary-restrictions">
            Dietary Restrictions
          </h2>
          <div className="clearfix"></div>

          <div className="float-left">
            <span>
              <input
                type="checkbox"
                name="kosher"
                checked={this.state.kosher}
                onChange={this.checkboxChangeHander}
              />
              <label htmlFor="kosher" className="filter-checkbox">
                Kosher
              </label>

              <input
                type="checkbox"
                name="vegetarian"
                value={this.state.vegetarian}
                checked={this.state.vegetarian}
                onChange={this.checkboxChangeHander}
              />
              <label htmlFor="vegetarian" className="filter-checkbox">
                Vegetarian
              </label>

              <input
                type="checkbox"
                name="vegan"
                value={this.state.vegan}
                checked={this.state.vegan}
                onChange={this.checkboxChangeHander}
              />
              <label htmlFor="vegan" className="filter-checkbox">
                Vegan
              </label>
            </span>
          </div>

          <div className="clearfix"></div>
          <br />
          <button
            className="btn btn-secondary gen-btn"
            onClick={this.props.onBack}
          >
            Back
          </button>
          <button
            className="btn btn-primary gen-btn"
            onClick={() => this.onSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default SetFilters;
