import React from 'react';
import { Switch, Route } from "react-router";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import Login from "../../pages/Login";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import userStore from "../../stores/UserStore";

import * as api from "../../api/Api.js";

const styles = theme => ({
    button: {
        color: '#5a2c22',
        backgroundColor: '#d44f22',
        borderColor: '#d44f22',
        boxShadow: 'none',
        margin: theme.spacing(2),
        width: 300,
        height: 64,
        fontSize: 22,
        '&:hover': {
            backgroundColor: '#f9b042',
            borderColor: '#f9b042',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#f9b042',
            borderColor: '#f9b042',
        },
    },
});

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPwd: '',
            buttonDisabled: false,
            endpointLocalURL: "http://localhost:4568",   // change port to whatever is in getHerokuAssignedPort() in Server.java
            endpointHerokuURL: "https://chicken-tinder-13-backend.herokuapp.com"
        }
    }

    //static endpointLocalURL = "http://localhost:4568";
    //static endpointHerokuURL = "https://chicken-tinder-13-backend.herokuapp.com";

    setInputValue(prop, val) {
        val = val.trim();
        if(val.length > 12) {
            return;
        }
        this.setState({
            [prop]: val
        })
    }

    validatePwd(prop, val) {
        this.setInputValue('confirmPwd', val);
        if(this.state.password !== this.state.confirmPwd) {

        }
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            confirmPwd: '',
            buttonDisabled: false
        })
    }

    /* logoutOnClose() { // tracks if window/tab is closed
        window.addEventListener("beforeunload", (ev) => {
            // want to logout in database beforehand

            
            // ev.preventDefault();
            // return this.doSomethingBeforeUnload();
        });
    }; */

    doSignup() {
        if(!this.state.username) {
            return;
        }
        if(!this.state.password) {
            return;
        }
        this.setState({
            buttonDisabled: true
        })

        //try{
            api.signup(this.state.username, this.state.password)
                .then((result) => {
                if((result.userName).valueOf() === (this.state.username).valueOf()) {
                    //UserStore.isLoggedIn = false; // have not logged in yet, simply created an account
                    //UserStore.username = result.username;
                    this.props.history.push("/Login"); // going back to Home page
                }
                else {
                    this.resetForm();
                    alert(result.msg + "Could not create account.");
                }
            })}


        //}
       /* catch (e) {
            if (e instanceof TypeError) {
                const NetworkErr1 = new String("Failed to fetch"); // Chrome
                const NetworkErr2 = new String("NetworkError when attempting to fetch resource."); // Firefox
                const NetworkErr3 = new String("Network request failed"); // Safari and others
                if (e.message.valueOf() === NetworkErr1.valueOf() || e.message.valueOf() === NetworkErr2.valueOf() || e.message.valueOf() === NetworkErr3.valueOf()) {
                    alert("Backend server is down. Please try again later.")
                }
            }
            
            console.log(e);
            this.resetForm();
            
        }
    } */

    render() {
        return (
            <Switch>
                <Route path="/Signup">
                    <div className="loginSignupForm">
                        Get started with us today!
                        <br/>
                        Create your account by filling out the information below.
                        <br/>
                        Username
                        <InputField type='text'
                                    placeholder='Username'
                                    value={this.state.username ? this.state.username : ''}
                                    onChange={ (val) => this.setInputValue('username', val) }
                        />
                        Password
                        <InputField type='password'
                                    placeholder='Password'
                                    value={this.state.password ? this.state.password : ''}
                                    onChange={ (val) => this.setInputValue('password', val) }
                        />
                        Confirm Password
                        <InputField type='password'
                                    placeholder='Password'
                                    value={this.state.confirmPwd ? this.state.confirmPwd : ''}
                                    onChange={ (val) => this.validatePwd('confirmPwd', val) }
                        />
                        <SubmitButton text='Sign up'
                                    disabled={this.state.buttonDisabled}
                                    onClick={ () => this.doSignup() }
                        />
                        Already have an account? Login <a href={"/Login"}>here</a>
                    </div>
                </Route>
                <Route path="/Login"> <Login/> </Route>
            </Switch>
        );
    }
}

export default withRouter((withStyles(styles)(SignupForm)))
