import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant_name: "Restaurant",
      price_range: "$",
      cuisine: "American",
      image: {
        backgroundImage: 'url(' + "https://www.ashton-design.com/case-study/readco/img/projects/JohnsHopkins/0511_FreshFoodCafe/0511_editedExterior.jpg" + ')', 
      }
    };
  }

  render() {
    return (
      <div class="card-body">
        <div class="restaurant-image" style={this.state.image}></div>
        <div class="restaurant-info">
          <h1 class="display-inline font-helvetica restaurant-name">
            {this.state.restaurant_name}
          </h1>
          <h2 class="display-inline font-helvetica restaurant-price-range">
            {this.state.price_range}
          </h2>
          <h2 class="font-helvetica restaurant-cuisine">
            {this.state.cuisine}
          </h2>
        </div>

        <div class="like-dislike-container">
          <button class="like-dislike-button float-left red">
            <i class="fas fa-heart"></i>
          </button>
          <button class="like-dislike-button float-right">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Card);
