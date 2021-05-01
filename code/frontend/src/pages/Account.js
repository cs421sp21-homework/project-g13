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
        if (localStorage.getItem("username") === null) {
            this.props.history.push("/");
        }
        this.state = {
            isLoading: true,
            showForm: false,
            prefList: [],
        };
    }

    async getPreference() {
        console.log("getPreference");
        this.state.prefList = await api.getUserPreference(localStorage.getItem("username"));
        this.state.isLoading= false;
        console.log(this.state.prefList);
    }

    showForm() {
        return(
            <div>
            <Preference/>
            </div>
        );
    }

    render() {
        this.getPreference();
        return(
            <Route path="/Account">
                <div className="App">
                    <h2 style={{fontSize: "2vmin"}}>Dietary Restrictions:</h2>
            {this.state.prefList.map((pref) => (<span>{pref}</span>))}
            <Button onClick={() => this.setState({showForm: true})}>
                Edit
            </Button>
            {this.state.showForm ? this.showForm() : null}
            </div>
            </Route>
        )
    }
}

export default withRouter(Account);
