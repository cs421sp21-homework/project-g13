import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Preference from "./Preference";
import UserStore from "../stores/UserStore";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePref: false
        };
    }


    render() {
        return(
            <div>
                Welcome, {UserStore.username}

                Dietary Restrictions:
                TODO: fetch from database
                <Button
                onClick={this.state.changePref = true}
                >
                    Edit
                </Button>
                {this.state.changePref ? <Preference/> : null}
            </div>
        )
    }
}

export default Account;
