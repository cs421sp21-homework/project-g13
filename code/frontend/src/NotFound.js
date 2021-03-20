import "./App.css";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import React, { Component } from "react";
import Home from "./Home"
import ListRestaurant from "./ListRestaurant";
import * as api from "./Api.js";

class NotFound extends Component {
    
    componentDidMount() {
        sessionStorage.clear();
    }
    
    
    reload() {
        //somehow fetch restaurants again
        //can't fetch here bc can't pass back to parent component
        //or very complicated and indirect through functions from parent
        //which I don't know how to
        this.props.history.push('/Location/ListRestaurants');
    }
    render() {
        return(
            <Switch>
                <Route path="/Location/ListRestaurants/NotFound">
                    <div className="App">
                        <header className="App-header">
                            <h1>No match found.</h1>
                            <h2>Try again?</h2>
                            <form>
                                <input
                                    type="button"
                                    value="Yes"
                                    onClick={() => this.reload()}
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
                <Route path="/Location/ListRestaurants">
                    <ListRestaurant/>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(NotFound)