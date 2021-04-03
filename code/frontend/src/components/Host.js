import "../App.css";
import React, { Component } from "react";
import SetFilters from "../pages/SetFilters.js"

export default class Host extends Component {
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
                <input
                  type="button"
                  value="Set Group Location"
                  onClick={this.props.setLocation}
                  hidden={!this.props.isHost}
                />
                <br />
                <input
                  type="button"
                  value="Set Filters"
                  onClick={this.props.openSetFilters}
                  hidden={!this.props.isHost}
                />
                <br />
                <input
                  type="button"
                  value="Start"
                  onClick={this.props.startSwipingEvent}
                  disabled={!this.props.canStartSwipingEvent}
                  hidden={!this.props.isHost}
                />
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
