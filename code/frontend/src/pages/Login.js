import "../App.css";
import React from 'react';
import { observer } from 'mobx-react';
import UserStore from "../stores/UserStore";
import LoginForm from "../components/LoginSignup/LoginForm";
import '../components/LoginSignup/LoginSignup.css';
import Account from "../components/Account";

class Login extends React.Component {

    async componentDidMount() {

        try {

            let res = await fetch('/isLoggedIn', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            });

            let result = await res.json();

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

            let res = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            });

            let result = await res.json();

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
            <div className="signup">
                <div className="container">
                    {UserStore.isLoggedIn ? <Account/> : <LoginForm/>}
                </div>
            </div>
        );
    }
}

export default new observer(Login);