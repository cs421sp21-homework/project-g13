import "../App.css";
import React, { Component } from "react";
import SetFilters from "../pages/SetFilters.js"
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    color: '#5a2c22',
    backgroundColor: '#eca237',
    borderColor: '#eca237',
    boxShadow: 'none',
    margin: theme.spacing(1),
    width: 256,
    height: 72,
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
  start: {
    color: '#f1d043',
    backgroundColor: '#d44f22',
    borderColor: '#d44f22',
    boxShadow: 'none',
    margin: theme.spacing(1),
    width: 256,
    height: 72,
    fontSize: 28,
    '&:hover': {
      backgroundColor: '#ec5f1a',
      borderColor: '#ec5f1a',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#ec5f1a',
      borderColor: '#ec5f1a',
    },
  },
});

class Host extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <div className="App">
            <header className="App-header">
              <div>
                <h1> Waiting for people to join... </h1>
                <p> TODO: dynamically show group members as they join </p>
              </div>
              <form>
                <Button
                    className={this.props.classes.button}
                    onClick={this.props.setLocation}
                    hidden={!this.props.isHost}
                    variant="contained"
                    size='large'
                >
                  Set Group Location
                </Button>
                <br/>
                <Button
                    className={this.props.classes.button}
                    onClick={this.props.openSetFilters}
                    hidden={!this.props.isHost}
                    variant="contained"
                    size='large'
                >
                  Set Filters
                </Button>
                <br />
                <Button
                    className={this.props.classes.start}
                    onClick={this.props.startSwipingEvent}
                    disabled={!this.props.canStartSwipingEvent}
                    hidden={!this.props.isHost}
                    variant="contained"
                    size='large'
                >
                  Start!
                </Button>
              </form>
              <div>
                <h2> Group ID: {this.props.roomId}</h2>
                <h2> Location: {this.props.location}</h2>
                <h2> Members: {this.props.numMembers}</h2>
                <h2> Status: {this.props.status}</h2>
              </div>
            </header>
          </div>
    );
  }
}

export default withStyles(styles)(Host)