import "../App.css";
import React, { Component } from "react";

export default class Host extends Component {

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
                  disabled={!this.props.isHost}
                />
                <br />
                <input
                  type="button"
                  value="Start"
                  onClick={this.props.startSwipingEvent}
                  disabled={!this.props.canStartSwipingEvent}
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
