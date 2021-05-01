import "../App.css";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import NewCard from "react-bootstrap/Card";
import Slideshow from "../components/Slideshow";
import Card from "../components/card.js";

class NotFoundRec extends Component {
  displayLeaderboard(topRes, topVotes) {
    if (topRes.length === 0) {
      return (
        <tr>
          <td>None</td>
          <td>None</td>
        </tr>
      );
    }
    let display = new Array();
    for (let i = 0; i < topRes.length; i++) {
      display.push(
        <tr>
          <td>
            <a href={topRes[i].url} target="_blank">
              {topRes[i].name}
            </a>
          </td>
          <td>
            <p>{topVotes[i]}</p>
          </td>
        </tr>
      );
    }
    return display;
  }

  render() {
    const { history } = this.props;
    const restaurant = this.props.rec;
    const topRes = this.props.topVotes.restaurants;
    const topVotes = this.props.topVotes.votes;
    const tryAgainVisible = this.props.tryAgainVisible;
    console.log("rec");
    console.log(restaurant);
    console.log("votes");
    console.log(topRes);
    console.log(topVotes);
    return (
      <div style={{ marginTop: "2vmin" }}>
        <h1
          style={{ fontWeight: "bold", fontSize: "4vmin", textAlign: "center" }}
        >
          No match found.
        </h1>
        <div className="recommend">
          <h1>But here's what our algorithm recommends:</h1>
          <Card cardType="no_match_found" restaurant={restaurant}></Card>
        </div>
        <div className="leaderboard">
          <h1>Leaderboard</h1>
          <table className="leaderboard-table">
            <tbody>
              <tr>
                <th>Restaurant:</th>
                <th>Number of votes:</th>
              </tr>
              {this.displayLeaderboard(topRes, topVotes)}
            </tbody>
          </table>
          {tryAgainVisible && (
            <div className="try-again">
              <h2>Try again?</h2>
              <button
                className={"btn btn-primary wide-btn"}
                onClick={this.props.onTryAgain}
              >
                {" "}
                Yes{" "}
              </button>
              <br />
              <button
                className={"btn btn-secondary wide-btn"}
                onClick={() => history.push("/")}
              >
                {" "}
                No{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(NotFoundRec);
