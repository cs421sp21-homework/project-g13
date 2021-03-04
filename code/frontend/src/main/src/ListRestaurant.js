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
        <Card />
      </div>
    );
  }
}

export default withRouter(ListRestaurant);
