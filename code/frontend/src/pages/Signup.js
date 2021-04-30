import "../App.css";
import React from 'react';
import { observer } from 'mobx-react';
import UserStore from "../stores/UserStore";
import SignupForm from "../components/LoginSignup/SignupForm";
import '../components/LoginSignup/LoginSignup.css';
import * as api from "../api/Api.js";

class Signup extends React.Component {

    async componentDidMount() {

        try {

            let result = api.isLoggedIn(UserStore.username ? UserStore.username : "");

            if(result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            }
            else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
            }
        }
        catch(e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }

    async doLogout() {

        try {

            let result = await api.logout(UserStore.username);

            if(result && result.success) {
                UserStore.isLoggedIn = false;
                UserStore.username = 'Guest';
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    render() {

        /* if(UserStore.loading) {
            return(
                <div className="signup">
                    <div className="container">
                        Loading, please wait...
                    </div>
                </div>
            );
        } else {
            if(UserStore.isLoggedIn) {
                return (
                    <div className="signup">
                        <div className="container">
                            Welcome {UserStore.username}

                            <SubmitButton
                                text={'Log out'}
                                onClick={() => this.doLogout() }
                                disabled={false}
                            />
                        </div>
                    </div>
                );
            }
        } */

        return (
            <div className="App">
                <SignupForm />
            </div>
        );
    }
}

export default new observer(Signup);
