import "../App.css"
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import Location from './Location'
import Signup from "./Signup";
import Navbar from "../components/Navbar/Navbar.js"
import Group from './Group'
import Individual from "./Individual";



class Home extends Component {
    constructor(props) {
        super(props);
        sessionStorage.clear();
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return(
            <Switch>
                <Route exact path="/">
                    <Navbar/>
                    <div className='App'>
                        <header className='App-header'>
                            <form>
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
                <Route path="/Location/:returnTo?">
                    <Location/>
                </Route>
                <Route path="/Join">
                    <Group isHost={false} />
                </Route>
                <Route path="/Host/:groupLocation?">
                    <Group isHost={true} />
                </Route>
                <Route path="/Login">
                    <Signup/>
                </Route>
                <Route path="/Individual">
                    <Individual />
                </Route>
            </Switch>
        )
    }
}

export default withRouter(Home)