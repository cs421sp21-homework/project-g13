import "../App.css"
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { Dropdown } from 'semantic-ui-react'
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    submit: {
        color: '#522402',
        backgroundColor: '#eca237',
        boxShadow: 'none',
        margin: theme.spacing(2),
        width: 128,
        height:48,
        fontSize: 20,
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
    back: {
        color: '#522402',
        backgroundColor: '#f1d043',
        boxShadow: 'none',
        margin: theme.spacing(2),
        width: 128,
        height:48,
        fontSize: 20,
        '&:hover': {
            backgroundColor: '#ffe03b',
            borderColor: '#ffe03b',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#ffe03b',
            borderColor: '#ffe03b',
        },
    },
});

class SetFilters extends Component {
    constructor(props) {
        super(props);
        this.cuisineOptions = [
            { key: 'american', text: 'American', value: 'American' },
            { key: 'mexican', text: 'Mexican', value: 'mexican' },
            { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
            { key: 'Greek', text: 'Greek', value: 'Greek' },
        ]

        this.priceOptions = [
            { key: '$', text: '$', value: '$' },
            { key: '$$', text: '$$', value: '$$' },
            { key: '$$$', text: '$$$', value: '$$$' },
            { key: '$$$$', text: '$$$$', value: '$$$$' },    
            { key: '$$$$$', text: '$$$$$', value: '$$$$$' },
        ]

        this.ratingOptions = [
            { key: '★', text: '★', value: '★' },
            { key: '★★', text: '★★', value: '★★' },
            { key: '★★★', text: '★★★', value: '★★★' },
            { key: '★★★★', text: '★★★★', value: '★★★★' },
            { key: '★★★★★', text: '★★★★★', value: '★★★★★' },
        ]
    }

    render() {
        return (
            <div className="app-background-color">
                <div className="filter-content">
                    <h1 className="filter-header">Let's narrow down your search:</h1>

                    <h2 className="float-left filter-subheader">Cuisine</h2>
                    <div className="clearfix"></div>

                    <Dropdown placeholder='Cuisine' fluid multiple selection options={this.cuisineOptions} className="filter-dropdown"/>
                    
                    <h2 className="float-left filter-subheader">Price</h2>
                    <div className="clearfix"></div>
                    <Dropdown placeholder='Price' fluid multiple selection options={this.priceOptions} className="filter-dropdown"/>

                    <h2 className="float-left filter-subheader">Rating</h2>
                    <div className="clearfix"></div>
                    <Dropdown placeholder='Rating' fluid multiple selection options={this.ratingOptions} className="filter-dropdown"/>

                    <h2 className="float-left filter-dietary-restrictions">Dietary Restrictions</h2>
                    <div className="clearfix"></div>

                    <div className="float-left">
                        <span>
                        <input type="checkbox" name="kosher"/>
                        <label for="kosher" className="filter-checkbox">Kosher</label>

                        <input type="checkbox" name="lactose_intolerant"/>
                        <label for="lactose_intolerant" className="filter-checkbox">Lactose Intolerant</label>

                        <input type="checkbox" name="vegetarian"/>
                        <label for="vegetarian" className="filter-checkbox">Vegetarian</label>

                        <input type="checkbox" name="vegan"/>
                        <label for="vegan" className="filter-checkbox">Vegan</label>
                        </span>
                    </div>

                    <div className="clearfix"></div>
                    <br/>
                    <Button
                        className={this.props.classes.submit}
                        onClick={this.props.onSubmit}
                        variant="contained"
                        size='large'
                    >
                        Submit
                    </Button>
                    <Button
                        className={this.props.classes.back}
                        onClick={this.props.onBack}
                        variant="contained"
                        size='large'
                    >
                        Back
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SetFilters)