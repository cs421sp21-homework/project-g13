import "../App.css";
import React, { Component } from "react";
import SetFilters from "../pages/SetFilters.js"
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    width: '30vmin',
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
    //console.log("member names");
    //console.log(this.props.memberNames);
    let memberNames = <span></span>;
    if (this.props.memberNames.length > 0) {
      memberNames = this.props.memberNames.map((name) =>
        <span key={name} className="grid-item">{name}</span>
      );
    }
    
    return (
          <div className="App-header">
              <div>
                <h1>Waiting for members to join...</h1>
              </div>
              
              <div className="member-names-grid">
                {memberNames}
              </div>


              <form>
                <button type="button" className="btn btn-secondary host-button"
                    onClick={this.props.setLocation}
                    hidden={!this.props.isHost}
                    variant="contained"
                >
                  Set Group Location
                </button>
                <br/>
                <button
                    className="btn btn-secondary host-button"
                    onClick={this.props.openSetFilters}
                    hidden={!this.props.isHost}
                    variant="contained"
                >
                  Set Filters
                </button>
                <br />
                <OverlayTrigger placement="right"
                            overlay={
                                <Tooltip id={`tooltip-right`} className="home-tooltip">
                                {this.props.canStartSwipingEvent === true ? "Start finding restaurants" : "Set your location first or wait for restaurant data"}
                                </Tooltip>
                                 }>
                                  <span className="d-inline-block" onClick={() => {
                                    if (this.props.canStartSwipingEvent) this.props.startSwipingEvent();
                                  }}>
                                    <button className="btn btn-primary host-button" style={{ pointerEvents: 'none' }}
                                        disabled={!this.props.canStartSwipingEvent}
                                        hidden={!this.props.isHost}
                                        variant="contained">
                                      Start!
                                    </button>
                                    </span>
                                   
                                  
                  </OverlayTrigger>
                 
              </form>
              <div>
                <h2> Group ID: {this.props.roomId}</h2>
                <h2> Location: {this.props.location}</h2>
                <h2> Members: {this.props.numMembers}</h2>
                <h2> Status: {this.props.status}</h2>
              </div>
          </div>
    );
  }
}

export default withStyles(styles)(Host)