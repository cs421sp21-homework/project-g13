import "./App.css";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import React, { Component } from "react";
import Home from "./Home"

class NotFound extends Component {
    render() {
        return(
            <Switch>
                <Route path="/NotFound">
                    <div className="App">
                        <header className="App-header">
                            <h1>No match found.</h1>
                            <h2>Try again?</h2>
                            <form>
                                <input
                                    type="button"
                                    value="Yes"
                                    onClick={() => this.props.history.push('/ListRestaurant')}
                                />
                                <input
                                    type="button"
                                    value="No"
                                    onClick={() => this.props.history.push("/")}
                                />
                            </form>
                        </header>
                    </div>
                </Route>
                <Route exact path="/">
                    <Home/>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(NotFound)