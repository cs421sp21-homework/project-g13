import './App.css'
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";

class Host extends Component {
    start() {
        //begin selection process for every group member.
        return;
    }

    render() {
        return(
            <Switch>
                <Route path="/Host">
                    <div className='App'>
                        <header className='App-header'>
                            <div>
                                <h1> Waiting for people to join... </h1>
                                <p> TODO: dynamically show group members as they join </p>
                            </div>
                            <form>
                                <input
                                    type="button"
                                    value="Set Group Location"
                                    onClick={() => this.props.history.push('/Location')}
                                />
                                <br/>
                                <input
                                    type="button"
                                    value="Start"
                                    onClick={() => this.start()}
                                />
                            </form>
                            <div>
                                <h2> Group ID: </h2>
                            </div>
                        </header>
                    </div>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(Host)