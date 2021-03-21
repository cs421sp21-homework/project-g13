import { Component } from "react";
import * as api from "./Api";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "./components/Navbar/Navbar";

class InputLocation extends Component {
    state = {
        address: "",
        suiteNum: "",
        city: "",
        state: "",
        zipcode: "",
        radius: 5,
        statusMessage: "",
    }
    myChangeHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    validInput = () => {
        if (this.state.address === "" || this.state.city === "" ||
            this.state.state === "" || this.state.zipcode === "") {
            this.setState({statusMessage: "Please enter all required fields."});
            return false;
        }
        if (this.state.radius === "") {
            this.setState({statusMessage: "Error: Search radius must be a number."});
            return false;
        }
        if (this.state.radius > 24.85) {
            this.setState({statusMessage: "Error: Maximum search radius is 24.85 miles."});
            return false;
        }
        if (this.state.radius <= 0) {
            this.setState({statusMessage: "Error: Search radius must be greater than 0."});
            return false;
        }
        return true;
    }

    milesToMeters = (miles) => {
        return Math.round(miles * 1609.34);
    }

    submit = () => {
        this.setState({statusMessage: "Loading..."});
        if (this.validInput()) {
            const loc = `${this.state.address} ${this.state.suiteNum} 
        ${this.state.city} ${this.state.state} ${this.state.zipcode}`;
            api.getRestaurants(loc, this.milesToMeters(this.state.radius))
                .then((response) => {
                    if (response[0] === "err") {
                        this.setState({statusMessage: "Error: Location not recognized by Yelp."});
                    } else if (response.length === 0) {
                        this.setState({statusMessage: "Error: No results found. Try broadening your search radius."});
                    } else {
                        this.props.onSubmit(response, loc, this.milesToMeters(this.state.radius));
                    }
                });
        }
    }

    render() {
        return (
            <div className="App">
                <Navbar />
                <header className="App-header">
                    <form>
                        <h1>Please enter your Location:</h1>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            onChange={this.myChangeHandler}
                        />
                        <input
                            type="text"
                            name="suiteNum"
                            placeholder="Suite Number (optional)"
                            onChange={this.myChangeHandler}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            onChange={this.myChangeHandler}
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            onChange={this.myChangeHandler}
                        />
                        <input
                            type="text"
                            name="zipcode"
                            placeholder="Zip Code"
                            onChange={this.myChangeHandler}
                        />
                        <br/>
                        <h1>Search for restaurants within: </h1>
                        <input
                            type="number"
                            name="radius"
                            max={24.85}
                            min={0.5}
                            step={0.5}
                            defaultValue={5}
                            onChange={this.myChangeHandler}
                        />
                        miles
                        <input
                            type="button"
                            value="Submit"
                            onClick={() => {this.submit()}}
                        />
                    </form>
                    <div className="status">
                        {this.state.statusMessage}
                    </div>
                </header>
            </div>
        )
    }
}
export default withRouter(InputLocation);

InputLocation.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};