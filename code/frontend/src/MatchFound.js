import "./App.css";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import React, { Component } from "react";
import PropTypes from "prop-types";
import NewCard from "react-bootstrap/Card";
import Slideshow from "./Slideshow";
import Home from "./Home";

class MatchFound extends Component {
    render() {
        const {restaurant} = this.props;
        const restaurantLocation = restaurant.location["address1"];
        const cuisineType = restaurant.categories[0]['title'];
        const rating = restaurant.rating;
        const reviewCount = restaurant.review_count;
        const webUrl = restaurant.url;
        const photos = restaurant.photos;
        const reviews = restaurant.reviews;

        return(
            <Switch>
                <Route path="/Location/ListRestaurants/Found">
                    <div className='App'>
                        <header className='App-header'>
                            <h1> Match Found!</h1>
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
                            <form>
                                <input
                                    type="button"
                                    value="Done"
                                    onClick={() => this.props.history.push("/")}
                                />
                            </form>
                        </header>
                    </div>
                </Route>
                <Route excat path="/">
                    <Home/>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(MatchFound)

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
            }).isRequired,
        ).isRequired,
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                alias: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
            }).isRequired,
        ).isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.string.isRequired,
        ).isRequired,
        location: PropTypes.shape({
            address1: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};
