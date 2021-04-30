import "../App.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import NewCard from "react-bootstrap/Card";
import Slideshow from "../components/Slideshow";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "./card.js";

class MatchFound extends Component {
  componentDidMount() {
    document.getElementById("scrollable").scrollIntoView();
  }
  render() {
    const { restaurant, classes, oldMatches } = this.props;

    return (
      <div id="scrollable">
          <h1 style={{fontWeight: "bold", fontSize: "4vmin", textAlign: "center"}}>Match found!</h1>
        <div className="recommend">
          <h1> Current Match: </h1>
          <Card cardType="match_found" restaurant={restaurant} />
        </div>
        <div className="leaderboard">
        <h1>Previous matches:</h1>
            {oldMatches.length === 0 && (<p style={{fontSize: "2vmin"}}> None </p>)}
            {oldMatches.length > 0 && (
            <div>
              {oldMatches.map((rest) => (
                  <p style={{fontSize: "2vmin"}}><a href={rest.url} target="_blank">{rest.name}</a></p>
              ))}
            </div>
            )}
        <form className="try-again">
          <h2>Continue?</h2>
          <button
              className="btn btn-primary gen-btn"
              onClick={this.props.onContinue}
          >
            Continue
          </button>
          <button
              className="btn btn-secondary gen-btn"
              onClick={this.props.onDone}
          >
            Done
          </button>
        </form>
        </div>
      </div>
    );
  }
}

export default MatchFound;

MatchFound.propTypes = {
  restaurant: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review_count: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        alias: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    location: PropTypes.shape({
      address1: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};
