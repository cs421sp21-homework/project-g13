//import "../App.css"
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Group from './Group'
import Individual from "./Individual";
import SetFilters from "./SetFilters.js"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import AppNavbar from "../components/NavBar.js";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        if (this.props.location.pathname !== "/Join" && this.props.location.pathname !== "/Host") {
            sessionStorage.clear();
            console.log("cleared");
        }

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
                            <button type="button" class="btn btn-primary home-button orange-button" onClick={() => this.props.history.push("/Host")}>Start</button>
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