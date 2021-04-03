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

const styles = theme => ({
    button: {
        color: '#5a2c22',
        backgroundColor: '#d44f22',
        borderColor: '#d44f22',
        boxShadow: 'none',
        margin: theme.spacing(2),
        width: 256,
        height: 64,
        fontSize: 24,
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
                                    Login/Sign up
                                </Button>
                                <br/>
                                <Button
                                    className={this.props.classes.button}
                                    onClick={() => this.nextPath('/Individual')}
                                    variant="contained"
                                    size='large'
                                >
                                    Start
                                </Button>
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
                                    onClick={() => this.nextPath('/Host')}
                                    variant="contained"
                                    size='large'
                                >
                                    Host a Group
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