import "../App.css";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import NewCard from "react-bootstrap/Card";
import Slideshow from "../components/Slideshow";
import Card from "../components/card.js"


class NotFoundRec extends Component {

    displayLeaderboard(topRes, topVotes) {
        let display = new Array();
        for (let i = 0; i < topRes.length; i++) {
            display.push(<tr>
                <td>
                <a href={topRes[i].url} target="_blank">{topRes[i].name}</a>
                </td>
                <td>
                <p>{topVotes[i]}</p>
                </td>
            </tr>);
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
        return(
                    <div className="App">
                            <h1 style={{textAlign: "center"}}>No match found.</h1>
                            <div className="recommend">
                            <h1>But here's what our algorithm recommends:</h1>
                            <Card cardType="no_match_found" restaurant={restaurant}></Card>
                            </div>
                            <div className="leaderboard">
                                <h2>Leaderboard</h2>
                                <table className="leaderboard-table">
                                    <tr>
                                        <th>Restaurant:</th>
                                        <th>Number of votes:</th>
                                    </tr>
                                {this.displayLeaderboard(topRes, topVotes)}
                                </table>
                        { tryAgainVisible &&
                        <div>
                            <h2>Try again?</h2>
                            <form>
                                <input
                                    type="button"
                                    value="Yes"
                                    onClick={this.props.onTryAgain}
                                />
                                <input
                                    type="button"
                                    value="No"
                                    onClick={() => history.push("/")}
                                />
                            </form>
                        </div>
                        }
                        </div>
                    </div>


        )
    }
}

export default withRouter(NotFoundRec);