import "./App.css";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import React, { Component } from "react";
import PropTypes from "prop-types";
import {SafeAnchor} from "react-bootstrap";

class MatchFound extends Component {
    render() {
        let data = this.props.location.state;

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
