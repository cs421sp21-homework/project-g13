import "../App.css";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    button: {
        color: '#5a2c22',
        backgroundColor: '#eca237',
        borderColor: '#eca237',
        boxShadow: 'none',
        margin: theme.spacing(1),
        width: 216,
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

class NotFound extends Component {
    
    render() {
        const { history } = this.props;
        const { classes } = this.props;
        return(
                    <div className="App">
                        <header className="App-header">
                            <h1>No match found.</h1>
                            <h2>Try again?</h2>
                            <form>
                                <Button
                                    className={classes.button}
                                    onClick={this.props.onTryAgain}
                                    variant="contained"
                                    size='large'
                                >
                                    Yes
                                </Button>
                                <br/>
                                <Button
                                    className={classes.button}
                                    onClick={() => history.push("/")}
                                    variant="contained"
                                    size='large'
                                >
                                    No
                                </Button>
                            </form>
                        </header>
                    </div>
        )
    }
}

export default withRouter((withStyles(styles)(NotFound)));