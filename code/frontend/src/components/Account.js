import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Preference from "./Preference";
import * as api from "../api/Api"
import UserStore from "../stores/UserStore";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePref: false
        };
    }

    getPreference() {
        api.getUserPreference(UserStore.username).then((response) => {
            return response;
        });
    }

    render() {
        return(
            <div>
                Welcome, {UserStore.username}

                Dietary Restrictions: {this.getPreference}
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
