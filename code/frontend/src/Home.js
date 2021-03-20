import "./App.css"
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import Location from './Location'
import Join from './Join'
import Host from './Host'
import ListRestaurant from './ListRestaurant';
import MatchFound from './MatchFound';


class Home extends Component {
    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return(
            <Switch>
                <Route exact path="/">
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
                <Route path="/Location">
                    <Location/>
                </Route>
                <Route path="/Join">
                    <Join/>
                </Route>
                <Route path="/Host">
                    <Host/>
                </Route>
                <Route path="/Found">
                    <MatchFound/>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(Home)