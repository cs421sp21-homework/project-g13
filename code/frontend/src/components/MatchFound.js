import "../App.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import NewCard from "react-bootstrap/Card";
import Slideshow from "../components/Slideshow";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    button: {
        color: '#5a2c22',
        backgroundColor: '#d44f22',
        borderColor: '#d44f22',
        boxShadow: 'none',
        margin: theme.spacing(2),
        width: 192,
        height: 56,
        fontSize: 24,
        '&:hover': {
            backgroundColor: '#f9b042',
            borderColor: '#f9b042',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#f9b042',
            borderColor: '#f9b042',
        },
    },
});

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
        const {classes} = this.props;

        return(
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
                                    <a href={webUrl}>Website</a>
                                    </NewCard.Subtitle>
                                </NewCard.Body>
                            </NewCard>
                            <form>
                                <Button
                                    className={classes.button}
                                    onClick={this.props.onDone}
                                    variant="contained"
                                    size='large'
                                >
                                    Done
                                </Button>
                            </form>
                        </header>
                    </div>
        )
    }
}

export default withStyles(styles)(MatchFound)

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
    classes: PropTypes.object.isRequired,
};
