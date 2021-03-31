import React, { Component } from "react";
import { Switch, Route } from "react-router";
//import { withRouter } from "react-router-dom";
//import io from "socket.io-client";
//import Host from "./Host.js";

export default class Join extends Component {
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
            <form>
            <h1>Please enter your Group ID:</h1>
            <input
                type="text"
                name="groupID"
                placeholder="Group ID"
                onChange={this.myChangeHandler}
            />
            <br />
            <input type="button" value="Join" onClick={this.join} />
            </form>
            <div className="status">{this.props.statusMessage}</div>
        </header>
        </div>
    );
  }
}

//export default withRouter(Join);
