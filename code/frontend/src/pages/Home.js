import "../App.css"
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import Signup from "./Signup";
import Group from './Group'
import Individual from "./Individual";
import SetFilters from "./SetFilters.js"

class Home extends Component {
    constructor(props) {
        super(props);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        if (this.props.location.pathname !== "/Join" && this.props.location.pathname !== "/Host") {
            sessionStorage.clear();
            console.log("cleared");
        }

        return(
            <Switch>
                <Route exact path="/">
                    <div className='App'>
                        <header className='App-header'>
                            <form>
                                <input
                                    type="button"
                                    value="Sign up/Login"
                                    onClick={() => this.nextPath('/Login')}
                                />
                                <br/>
                                <input
                                    type="button"
                                    value="Start"
                                    onClick={() => this.nextPath('/Individual')}
                                />
                                <br/>
                                <input
                                    type="button"
                                    value="Join a Group"
                                    onClick={() => this.nextPath('/Join')}
                                />
                                <br/>
                                <input
                                    type="button"
                                    value="Host a Group"
                                    onClick={() => this.nextPath('/Host')}
                                />
                            </form>
                        </header>
                    </div>
                </Route>
                <Route path="/Join">
                    <Group isHost={false} />
                </Route>
                <Route path="/Host">
                    <Group isHost={true} />
                </Route>
                <Route path="/Login">
                    <Signup/>
                </Route>
                <Route path="/Individual">
                    <Individual />
                </Route>
                <Route path="/Filter">
                    <SetFilters />
                </Route>
            </Switch>
        )
    }
}

export default withRouter(Home)