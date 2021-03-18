import "./App.css";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import React, { Component } from "react";
import Card from "./card.js";
import PropTypes from "prop-types";
import {SafeAnchor} from "react-bootstrap";

class MatchFound extends Component {
    render() {
        return(
            <Switch>
                <Route path="/Found">
                    <div className='App'>
                        <header className='App-header'>
                            <h1> Match Found!</h1>

                        </header>
                    </div>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(MatchFound)