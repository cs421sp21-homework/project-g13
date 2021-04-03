import React, { Component } from "react";
import { Switch, Route } from "react-router";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//import { withRouter } from "react-router-dom";
//import io from "socket.io-client";
//import Host from "./Host.js";

const styles = theme => ({
    textField: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    button: {
        color: '#522402',
        backgroundColor: '#eca237',
        boxShadow: 'none',
        margin: theme.spacing(2),
        width: 216,
        height:48,
        fontSize: 20,
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

class Join extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = props.onSubmit;
    this.state = {
      groupID: "",
    };
  }

  join = () => {
    this.onSubmit(this.state.groupID);
  };

  myChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
        <div className="App">
        <header className="App-header">
            <form className={this.props.classes}>
            <h1>Please enter your Group ID:</h1>
                <TextField
                    required
                    id="address"
                    label="Group ID"
                    variant="outlined"
                    helperText="* are required fields"
                    name="groupID"
                    style={{width:256}}
                    onChange={this.myChangeHandler}
                />
                <br/>
                <Button
                    className={this.props.classes.button}
                    onClick={() => {
                        this.join();
                    }}
                    variant="contained"
                    size='large'
                >
                    Join
                </Button>
            </form>
            <div className="status">{this.props.statusMessage}</div>
        </header>
        </div>
    );
  }
}

export default withStyles(styles)(Join);
