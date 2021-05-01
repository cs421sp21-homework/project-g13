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
        api.getUserPreference(this.getUserName()).then((response) => {
            console.log(response);
            alert("Preferences stored!");
            return response;
        });
    }

    getUserName() {
        let currUser = localStorage.getItem("username");
        if (currUser === null) {
            currUser = "Guest";
        }
        return currUser;
    }

    render() {
        const prefList = this.getPreference();
        console.log(prefList);
        return(
            <Switch>
            <Route path="/Account">
            <div className="App">
                <h1 style={{fontWeight: "bold", fontSize: "3vmin"}}> Welcome, {localStorage.getItem("username")}</h1>
                <h2 style={{fontSize: "2vmin"}}>Dietary Restrictions: </h2>
                <Button
                onClick={() => {this.state.changePref = !this.state.changePref;}}
                >
                    Edit
                </Button>
                {this.state.changePref ? null : <Preference/> }
                </div>
            </Route>
            </Switch>
        )
    }
}

export default withRouter(Account);
