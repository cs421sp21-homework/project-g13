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

        console.log(this.state.prefList);
        console.log(this.state.isLoading);
        this.getPreference();
    }

    async getPreference() {
        console.log("getPreference");
        this.state.prefList = await api.getUserPreference(localStorage.getItem("username"));
        this.setState({isLoading: false});
        console.log(this.state.prefList);
        console.log(this.state.isLoading);
    }

    showForm() {
        return(
            <div>
            <Preference/>
            </div>
        );
    }

    render() {
        if(this.state.isLoading) {
            return(
                <div className="App">
                    <p style={{marginTop: "10vh", fontSize: "3vmin"}}>Loading preferences...</p>
                </div>
            )
        }
        return(
            <Route path="/Account">
                <div className="App">
                    <h2 style={{marginTop: "4vmin"}}>Dietary Restrictions:</h2>
            {this.state.prefList.map((pref) => (<span style={{fontSize: "2.4vmin"}}>{pref}</span>))}
            <button className="btn btn-secondary small-btn" onClick={() => this.setState({showForm: true})}>
                Edit
            </button>
            {this.state.showForm ? this.showForm() : null}
            </div>
            </Route>
        )
    }
}

export default withRouter(Account);
