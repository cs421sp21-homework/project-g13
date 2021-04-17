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
            lactose: false,
            gluten: false,
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.checked,
        });
    };

    updatePreference() {
        var preference = [];
        if (this.state.vegetarian) {
            preference.push("vegetarian");
        }
        if (this.state.vegan) {
            preference.push("vegan");
        }
        if (this.state.kosher) {
            preference.push("kosher");
        }
        if (this.state.lactose) {
            preference.push("lactose-intolerant");
        }
        if (this.state.gluten) {
            preference.push("gluten-free");
        }
        console.log(preference);
        api.updatePreference(UserStore.username, preference).then( (response)=> {
            return response;
        });
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
                        control={<Checkbox checked={this.state.lactose} onChange={this.handleChange} name="lactose"/>}
                        label="lactose-intolerant"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={this.state.gluten} onChange={this.handleChange} name="gluten"/>}
                        label="gluten-free"
                    />
                </FormGroup>
                <Button
                onClick={this.updatePreference()}
                >
                    Save
                </Button>
            </form>
        )
    }
}

export default Preference;