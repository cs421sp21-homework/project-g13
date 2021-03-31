import "../App.css";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import React, { Component } from "react";
import Home from "./Home"
import ListRestaurant from "./ListRestaurant";
import * as api from "../api/Api.js";

class NotFound extends Component {
    
    render() {
        const { history } = this.props;
        return(
                    <div className="App">
                        <header className="App-header">
                            <h1>No match found.</h1>
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