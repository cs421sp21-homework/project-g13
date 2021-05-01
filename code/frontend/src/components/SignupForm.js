import React from 'react';
import { Switch, Route } from "react-router";
import Login from "../pages/Login";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import userStore from "../stores/UserStore";

import * as api from "../api/Api.js";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    textField: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    input: {
        height: 50,
        fontSize: 20,
    }
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

    myChangeHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    validatePwd(prop, val) {
        // this.setInputValue('confirmPwd', val);
        if(this.state.password !== this.state.confirmPwd) {
            alert("'Confirm Password' does not match 'Password'!")
            this.resetForm();
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

        this.validatePwd();

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
                    <div className="login-container">
                        <h1 style={{fontWeight: "bold", fontSize: "4vmin"}}>Chicken Tinder</h1>
                        <h2 style={{fontSize: "3vmin"}}>Get started with us today!</h2>
                        <h3 style={{fontSize: "2vmin"}}>Create your account by filling out the information below.</h3>
                        <form className={this.props.classes.textField}>
                            <TextField
                                id="username"
                                label="Username"
                                variant="outlined"
                                name="username"
                                style={{width: 256}}
                                InputProps={{className: this.props.classes.input}}
                                onChange={this.myChangeHandler}
                            />
                            <br/>
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                name="password"
                                type="password"
                                style={{width: 256}}
                                InputProps={{className: this.props.classes.input}}
                                onChange={this.myChangeHandler}
                            />
                            <br/>
                            <TextField
                                id="confirmPwd"
                                label="Confirm Password"
                                variant="outlined"
                                name="confirmPwd"
                                type="password"
                                style={{width: 256}}
                                InputProps={{className: this.props.classes.input}}
                                onChange={this.myChangeHandler}
                            />
                        </form>
                        <button
                            className="btn btn-primary wide-btn"
                            onClick={() => {this.doSignup();}}
                            disabled={this.state.buttonDisabled}
                        >
                            Sign up
                        </button>
                        <p style={{fontSize: "1.6vmin"}}>Already have an account? Login <a href={"/Login"}>here</a></p>
                    </div>
                </Route>
                <Route path="/Login"> <Login/> </Route>
            </Switch>
        );
    }
}

export default withRouter((withStyles(styles)(SignupForm)))
