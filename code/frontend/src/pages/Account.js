import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Preference from "../components/Preference";
import * as api from "../api/Api"
import UserStore from "../stores/UserStore";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePref: false
        };
    }

    getPreference() {
        api.getUserPreference(UserStore.getUsername()).then((response) => {
            if (response.isEmpty()) {
                return "none";
            }
            return response;
        });
    }

    render() {
        return(
            <Switch>
            <Route path="/Account">
            <div className="App">
                <header className="App-header">
                <h2>Welcome, {UserStore.getUsername()}</h2>
                <h2>Dietary Restrictions: {this.getPreference}</h2>
                <Button
                onClick={() => {this.state.changePref = true}}
                >
                    Edit
                </Button>
                {this.state.changePref ? null : <Preference/> }
                </header>
            </div>
            </Route>
            </Switch>
        )
    }
}

export default withRouter(Account);
