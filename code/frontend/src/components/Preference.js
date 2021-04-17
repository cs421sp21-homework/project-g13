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
            preferenceList: [],
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.checked,
        });
    };

    updatePreference() {
        
        this.state.preferenceList = [];

        if (this.state.vegetarian) {
            this.state.preferenceList.push("vegetarian");
        }
        if (this.state.vegan) {
            this.state.preferenceList.push("vegan");
        }
        if (this.state.kosher) {
            this.state.preferenceList.push("kosher");
        }
        if (this.state.gluten) {
            this.state.preferenceList.push("gluten-free");
        }
        console.log(this.state.preferenceList);
        api.updatePreference(UserStore.getUsername(), this.state.preferenceList).then( (response)=> {
            //return response;
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
                        control={<Checkbox checked={this.state.gluten} onChange={this.handleChange} name="gluten"/>}
                        label="gluten-free"
                    />
                </FormGroup>
                <Button
                onClick={() => this.updatePreference()}
                >
                    Save
                </Button>
            </form>
        )
    }
}

export default Preference;