import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import App from './App'
import Join from './Join'
import Host from './Host'


class Home extends Component {
    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <ul className = 'simple-button'>
                        <li>
                            <button onClick={()=>this.nextPath('/Location')}>
                                Start
                            </button>
                        </li>
                        <li>
                            <button onClick={()=>this.nextPath('/Join')}>
                                Join a Group
                            </button>
                        </li>
                        <li>
                            <button onClick={()=>this.nextPath('/Host')}>
                                Host a Group
                            </button>
                        </li>
                    </ul>
                </Route>
                <Route path="/Location">
                    <App/>
                </Route>
                <Route path="/Join">
                    <Join/>
                </Route>
                <Route path="/Host">
                    <Host/>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(Home)