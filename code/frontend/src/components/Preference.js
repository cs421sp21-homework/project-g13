import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";

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
                <Button>
                    Save
                </Button>
            </form>
        )
    }
}

export default Preference;