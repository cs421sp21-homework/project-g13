import "./App.css";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import Card from "./card.js";

class ListRestaurant extends Component {
  render() {
    const data = this.props.location.state;
    let location = Object.values(data);
    let locationString = "";
    for (let i = 0; i < location.length; i++) {
      locationString += location[i];
      if (i < location.length - 1) {
        locationString += ", ";
      }
    }
    return (
      <div className="App-header">
        <h1>{locationString}</h1>
        <Card
            restaurant={{
              restaurant_name: "Restaurant",
              price_range: "$",
              cuisine: "American",
              backgroundImage: "https://www.ashton-design.com/case-study/readco/img/projects/JohnsHopkins/0511_FreshFoodCafe/0511_editedExterior.jpg",
            }}
            onDislike={() => console.log("hello")}
        />
      </div>
    );
  }
}

export default withRouter(ListRestaurant);
