import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import * as api from "../api/Api"
import UserStore from "../stores/UserStore";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";

class Preference extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem("username") === null) {
            this.props.history.push("/");
        }
        this.state = {
            isLoading: true,
            showForm: false,
            prefList: [],
            vegetarian: false,
            vegan: false,
            kosher: false,
            gluten: false,
        };

        console.log(this.state.prefList);
        console.log(this.state.isLoading);
        this.getPreference();
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.checked,
        });
    };

    async updatePreference() {
        let preferences = [];
        if (this.state.vegetarian) {
            preferences.push("vegetarian");
        }
        if (this.state.vegan) {
            preferences.push("vegan");
        }
        if (this.state.kosher) {
            preferences.push("kosher");
        }
        if (this.state.gluten) {
            preferences.push("gluten-free");
        }
        console.log(preferences);
        try {
            await api.updatePreference(localStorage.getItem("username"), preferences).then(() => {
                alert("Preferences saved.");
            });
        } catch (err) {
            alert("An error occurred while updating preferences.")
        }
        this.setState({prefList: preferences});
        console.log(this.state.prefList);
        this.props.history.push("/Account");
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
            <form>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.vegetarian} onChange={this.handleChange}
                                           name="vegetarian"/>}
                        label="vegetarian"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={this.state.vegan} onChange={this.handleChange} name="vegan"/>}
                        label="vegan"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={this.state.kosher} onChange={this.handleChange} name="kosher"/>}
                        label="kosher"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={this.state.gluten} onChange={this.handleChange} name="gluten"/>}
                        label="gluten-free"
                    />
                </FormGroup>
                <button
                    className="btn btn-primary wide-btn"
                    onClick={() => this.updatePreference()}
                >
                    Save
                </button>
            </form>
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
            <Route path="/Preference">
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

export default withRouter(Preference);
