import "../App.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import NewCard from "react-bootstrap/Card";
import Slideshow from "../components/Slideshow";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "./card.js";

const styles = (theme) => ({
  button: {
    color: "#0A0903",
    backgroundColor: "#FDEFB1",
    borderColor: "#d44f22",
    boxShadow: "none",
    margin: theme.spacing(2),
    width: 192,
    height: 56,
    fontSize: 24,
    "&:hover": {
      backgroundColor: "#f9b042",
      borderColor: "#f9b042",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#f9b042",
      borderColor: "#f9b042",
    },
  },
});

class MatchFound extends Component {
  componentDidMount() {
    document.getElementById("scrollable").scrollIntoView();
  }
  render() {
    const { restaurant, classes, oldMatches } = this.props;

    return (
      <div className="App" id="scrollable">
        <header className="App-header">
          <h1> Match Found!</h1>
          <Card cardType="match_found" restaurant={restaurant} />
          <form>
            <Button
              className={classes.button}
              onClick={this.props.onContinue}
              variant="contained"
              size="large"
            >
              Continue
            </Button>
            <Button
              className={classes.button}
              onClick={this.props.onDone}
              variant="contained"
              size="large"
            >
              Done
            </Button>
          </form>
          {oldMatches.length > 0 && (
            <div>
              <h1>Previous matches:</h1>
              {oldMatches.map((rest) => (
                <Card cardType="match_found" restaurant={rest} />
              ))}
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default withStyles(styles)(MatchFound);

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
