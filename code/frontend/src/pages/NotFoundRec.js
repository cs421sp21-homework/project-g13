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
            display.push(<div>
                <a href={topRes[i].url}>{topRes[i].name}</a>
                <p>Number of votes: {topVotes[i]}</p>
            </div>);
        }
        return display;
    }

    render() {
        const { history } = this.props;
        const restaurant = this.props.rec;
        const topRes = this.props.topVotes.restaurants;
        const topVotes = this.props.topVotes.votes;
        console.log("rec");
        console.log(restaurant);
        console.log("votes");
        console.log(topRes);
        console.log(topVotes);
        const restaurantLocation = restaurant.location["address1"];
        const cuisineType = restaurant.categories[0]['title'];
        const rating = restaurant.rating;
        const reviewCount = restaurant.review_count;
        const webUrl = restaurant.url;
        const photos = restaurant.photos;
        const reviews = restaurant.reviews;
        return(
                    <div className="App">
                        <header className="App-header">
                            <h1>No match found.</h1>
                            <h1>But here's what our algorithm recommends:</h1>
                            <Card cardType="no_match_found" restaurant={restaurant}></Card>
                            <h2>Leaderboard</h2>
                            {this.displayLeaderboard(topRes, topVotes)}
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
                        </header>
                    </div>
        )
    }
}

export default withRouter(NotFoundRec);