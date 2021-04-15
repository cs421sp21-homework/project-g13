import "../App.css"
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Group from './Group'
import Individual from "./Individual";
import SetFilters from "./SetFilters.js"
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import userStore from "../stores/UserStore";
//blue BFD7EA
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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpointLocalURL: "http://localhost:4568",
            endpointHerokuURL: "https://chicken-tinder-13-backend.herokuapp.com"
        }
    }

    //static endpointLocalURL = "http://localhost:4568";
    //static endpointHerokuURL = "https://chicken-tinder-13-backend.herokuapp.com";

    nextPath(path) {
        this.props.history.push(path);
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    async logout() {
        //this.setState({ statusMessage: "Fetching restaurants..."});
        //this.statusMessageChanged = true;
        /* if (this.validInput()) {
          var locationString = `${this.state.address} ${this.state.suiteNum} 
          ${this.state.city} ${this.state.state} ${this.state.zipcode}`;
          
          //call the onSubmit function from props
          this.props.onSubmit({location: locationString, radius: this.state.radius});
        } */
        
        try{
            
            let res = await fetch(this.state.endpointLocalURL + '/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: userStore.getUsername(),
                    //password: this.state.password
                })
            });
            let result = await res.json();
            //if((result.userName).valueOf() === (this.state.username).valueOf()) {
                //const logoutSuccess = new String((JSON.parse(result))["message"]); // getting the return string from Java routing method
                const success = new String("success");
                //const fail = new String("fail");
                //if (message.valueOf() === )
                if ((result.message).valueOf() === success.valueOf()) {
                    userStore.setIsLoggedIn(false);
                    userStore.setUsername("Guest");
                    this.props.history.push("/"); // going back to Home page
                } else {
                    // do something about wrong passwords
                }
            /*} else {
                this.resetForm();
                alert(result.msg);
            }*/
        }
        catch (e) {
            console.log(e);
            this.resetForm();
        }

      }

    render() {
        if (this.props.location.pathname !== "/Join" && this.props.location.pathname !== "/Host") {
            sessionStorage.clear();
            console.log("cleared");
        }
        const username = userStore.getUsername();

        return(
            <Switch>
                <Route exact path="/">
                    <div className='App'>
                        <header className='App-header'>
                            <h1> Hello, {username}! </h1>
                            <br/>
                            <form>
                                <Button
                                    className={this.props.classes.button}
                                    onClick={() => this.nextPath('/Signup')}
                                    variant="contained"
                                    size='large'
                                >
                                    Sign up/Login
                                </Button>
                                <br/>
                                <OverlayTrigger key="right" placement="right" overlay={
                                    <Tooltip id="tooltip-right">
                                    Play by yourself or host a group
                                    </Tooltip>
                                }>
                                    <Button
                                    className={this.props.classes.button}
                                    onClick={() => this.nextPath('/Host')}
                                    variant="contained"
                                    size='large'
                                >
                                    Start/Host Group
                                </Button>

                                </OverlayTrigger>
                                <br/>
                                <Button
                                    className={this.props.classes.button}
                                    onClick={() => this.nextPath('/Join')}
                                    variant="contained"
                                    size='large'
                                >
                                    Join a Group
                                </Button>
                                <br/>
                                <Button
                                    className={this.props.classes.button}
                                    onClick={() => this.logout()}
                                    variant="contained"
                                    size='large'
                                >
                                    Logout
                                </Button>
                            </form>
                        </header>
                    </div>
                </Route>
                <Route path="/Join">
                    <Group isHost={false} />
                </Route>
                <Route path="/Host">
                    <Group isHost={true} />
                </Route>
                <Route path="/Signup">
                    <Signup/>
                </Route>
                <Route path="/Login">
                    <Login/>
                </Route>
                <Route path="/Individual">
                    <Individual />
                </Route>
                <Route path="/Filter">
                    <SetFilters />
                </Route>
            </Switch>
        )
    }
}

export default withRouter((withStyles(styles)(Home)))