//import "../App.css"
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Group from './Group';
import userStore from "../stores/UserStore";
import Individual from "./Individual";
import SetFilters from "./SetFilters"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import AppNavbar from "../components/NavBar.js";
import * as api from "../api/Api.js";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpointLocalURL: "http://localhost:4568",    // change port to whatever is in getHerokuAssignedPort() in Server.java
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
            
            let result = await api.logout(userStore.getUsername());
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
                    <div style={{textAlign: "center"}}>
                        <h1 className="home-main-text">Can't decide what to eat?</h1>
                        <h2 className="home-secondary-text">We'll help you!</h2>
                        <OverlayTrigger
                            key="left"
                            placement="left"
                            overlay={
                                <Tooltip id={`tooltip-left`} className="home-tooltip">
                                Find what to eat by yourself or with friends
                                </Tooltip>
                                 }>
                            <button type="button" class="btn btn-primary home-button" onClick={() => this.props.history.push("/Host")}>Start</button>
                        </OverlayTrigger>

                        <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                                <Tooltip id={`tooltip-right`} className="home-tooltip">
                                Join a room with friends
                                </Tooltip>
                                 }>
                            <button type="button" class="btn btn-secondary home-button" onClick={() => this.props.history.push("/Join")}>Join</button>
                        </OverlayTrigger>
                    </div>
        )
    }
}

export default withRouter(Home);