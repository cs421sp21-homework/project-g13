import "../App.css";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import React, { Component } from "react";
import Home from "./Home"
import ListRestaurant from "./ListRestaurant";
import * as api from "../api/Api.js";
import NewCard from "react-bootstrap/Card";
import Slideshow from "../components/Slideshow";


class NotFound extends Component {
    
    render() {
        const { history } = this.props;
        const restaurant = this.props.rec;
        console.log(restaurant);
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
                            <NewCard style = {{justify: 'center'}}>
                                <NewCard.Body>
                                    <Slideshow
                                        photos = {photos}
                                        reviews = {reviews}
                                    />
                                    <NewCard.Title style = {{fontSize: '3vh'}}>{restaurant.name}</NewCard.Title>
                                    <NewCard.Subtitle style = {{fontSize: '2vh'}}>{cuisineType} {restaurant.price}</NewCard.Subtitle>
                                    <NewCard.Text style = {{fontSize: '2vh'}}>
                                        {rating} from {reviewCount} reviews
                                    </NewCard.Text>
                                    <NewCard.Text style = {{fontSize: '2vh'}}>
                                        {restaurantLocation}
                                    </NewCard.Text>
                                    <NewCard.Subtitle>
                                        {webUrl}
                                    </NewCard.Subtitle>
                                </NewCard.Body>
                            </NewCard>
                            <h2>Leaderboard</h2>

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

export default withRouter(NotFound);