import './App.css'
import React, { Component } from "react";
import { Switch, Route, generatePath } from "react-router";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";

class Host extends Component {
    constructor(props) {
        super(props);
        this.socket = io("http://localhost:4000", {
            withCredentials: true,
        });
        var room = "" + Math.floor((Math.random() * 1000) + 1);
        this.socket.emit("create_room", room);
        window.sessionStorage.setItem("RoomID", room);
        this.state = {
            roomId: room,
            location: "Not Set",
        };
    }

    start() {
        //begin selection process for every group member.
        return;
    }

    setLocation() {
        this.props.history.push({
            pathname: generatePath("/Location/Host"),
        });
    }

    componentDidMount() {
        this.groupLocation = this.props.match.params.groupLocation;
        console.log(this.groupLocation);
        this.setState({location: this.groupLocation});
    }

    render() {
        return(
            <Switch>
                <Route path="/Host">
                    <div className='App'>
                        <header className='App-header'>
                            <div>
                                <h1> Waiting for people to join... </h1>
                                <p> TODO: dynamically show group members as they join </p>
                            </div>
                            <form>
                                <input
                                    type="button"
                                    value="Set Group Location"
                                    onClick={() => this.setLocation()}
                                />
                                <br/>
                                <input
                                    type="button"
                                    value="Start"
                                    onClick={() => this.start()}
                                />
                            </form>
                            <div>
                                <h2> Group ID: {this.state.roomId}</h2>
                                <h2> Location: {this.state.location}</h2>
                            </div>
                        </header>
                    </div>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(Host)