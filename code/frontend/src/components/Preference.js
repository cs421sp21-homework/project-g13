import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";
import * as api from "../api/Api"
import UserStore from "../stores/UserStore";

class Preference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vegetarian: false,
            vegan: false,
            kosher: false,
            gluten: false,
        }
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
        await api.updatePreference(localStorage.getItem("username"), preferences).then( (response)=> {
            alert("Preferences saved!");
        });

        this.props.history.push("/Account");
    }

    render() {
        return (
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
        )
    }
}

export default Preference;