import React from 'react';
import { Switch, Route } from "react-router";
import userStore from "../stores/UserStore";
import Home from "../pages/Home";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Message } from 'semantic-ui-react';

import * as api from "../api/Api.js";

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

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false,
            endpointLocalURL: "http://localhost:4568", // change port to whatever is in getHerokuAssignedPort() in Server.java
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

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    myChangeHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    async doLogin() {
        if(!this.state.username) {
            return;
        }
        if(!this.state.password) {
            return;
        }
        this.setState({
            buttonDisabled: true
        })

        try{

            //tryingThis = Api.postUser("testing", "testing", "testing", 1);
            //tryingThis = Api.updatePreferences("test22", ["vegan", "indpak", "kosher"]);


            let result = await api.login(this.state.username, this.state.password);

            //if((result.userName).valueOf() === (this.state.username).valueOf()) {
                //const loginSuccess = new String((JSON.parse(result))["message"]); // getting the return string from Java routing method
                //const pass = new String("pass");
                const fail = new String("fail");
                const error = new String("400: (BAD REQUEST) No user with that username exists!");
                //if (message.valueOf() === )
                if ((result.message).valueOf() === fail.valueOf()) {
                    // do something about wrong passwords
                    this.resetForm();
                    alert("Wrong password!");
                } else if ((result.message).valueOf() === error.valueOf()) {
                    this.resetForm();
                    alert("No user with that username exists!");
                } else if ((result.message).valueOf() !== fail.valueOf()) {
                    //userStore.setIsLoggedIn(true);
                    //userStore.setUsername(result.message);
                    localStorage.setItem("username", result.message);
                    this.props.history.push("/"); // going back to Home page
                    //return use

                } else {
                    this.resetForm();
                    //alert(result.message);
                }
            /*} else {
                this.resetForm();
                alert(result.msg);
            }*/
        }
        catch (e) {
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
    }
//<Route path="/"><Home/></Route>
    render() {
        return (
            <Switch>
                <Route path="/Login">
                    <div className="login-container">
                        <h1 style={{fontWeight: "bold", fontSize: "4vmin"}}>Chicken Tinder</h1>
                        <h2 style={{fontSize: "2.4vmin"}}>Welcome back, please log in.</h2>
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
                        </form>
                        <button class="btn btn-primary wide-btn" onClick={() => {this.doLogin();}}>
                            Login
                        </button>
                        <p style={{fontSize: "1.6vmin"}}>Don't have an account? Sign up <a href={"/Signup"}>here</a></p>
                    </div>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        );
    }
}

export default withRouter((withStyles(styles)(LoginForm)))
