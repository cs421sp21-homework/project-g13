import "../App.css"
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import Location from './Location'
import Join from './Join'
import Host from './Host'
//import MatchFound from './MatchFound';
import Signup from "../Signup";
import Navbar from "../components/Navbar/Navbar.js"



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
                                    onClick={() => this.nextPath('/Location')}
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
                    <Join/>
                </Route>
                <Route path="/Host/:groupLocation?">
                    <Host/>
                </Route>
                <Route path="/Login">
                    <Signup/>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(Home)