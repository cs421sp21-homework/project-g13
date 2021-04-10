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
            <Switch>
                <Route exact path="/">
                    <div className='App'>
                        <header className='App-header'>
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