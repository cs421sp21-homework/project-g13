import './App.css'
import React, { Component } from "react";
import { Switch, Route, generatePath } from "react-router";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";

class Host extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.id = Host.id;
        Host.id++;
        this.pendingSendLocation = false;
        this.pendingJoinRoom = false;
        this.pendingCreate = false;
        //socket.io stuff
        this.socket = io("http://localhost:4000", {
            withCredentials: true,
        });

        this.socket.on("ready", () => {
            console.log("recieved ready event");
            console.log(this._isMounted);
            if (this._isMounted) {
                console.log("mounted");
                this.setState({canNotStart: false, status: "Ready"});
            } else {
                console.log("not mounted");
                this.state.canNotStart = false;
                this.state.status = "Ready";
            }
            
        });

        this.socket.on("message", (data) => {
            const { message } = data;
            console.log(this.id + ": " + message);
        });

        this.socket.on("connect", () => {
            this.socketOnConnect();
        });

        var isHost = sessionStorage.getItem("isHost");
        var roomId = sessionStorage.getItem("roomId");
        if (isHost === null && roomId === null) {
            roomId = "" + Math.floor((Math.random() * 1000) + 1);
            this.createRoom(roomId);
            sessionStorage.setItem("isHost", "true");
            sessionStorage.setItem("roomId", roomId);
        } else {
            console.log(roomId);
            this.joinRoom(roomId);
        }
        
        this.state = {
            roomId: roomId,
            location: "Not Set",
            canNotStart: true,
            status: "Not Ready",
        };
    }
    static id = 0;

    createRoom(roomId) {
        if (this.socket.connected) {
            this.socket.emit("create_room", roomId);
        } else {
            this.pendingCreate = true;
        }
    }

    joinRoom(roomId) {
        if (this.socket.connected) {
            this.socket.emit("join_room", roomId);
        } else {
            this.pendingJoin = true;
        }
    }

    socketOnConnect() {
        if (this.socket != null) {
            console.log(this.id + ": socket id: " + this.socket.id);
        }
        
        if (this.pendingCreate) {
            this.socket.emit("create_room", this.state.roomId);
            this.pendingCreate = false;
            console.log("created room!");
        }

        if (this.pendingJoin) {
            this.socket.emit("join_room", this.state.roomId);
            this.pendingJoin = false;
        }

        if (this.pendingSendLocation) {
            this.socket.emit("set_location", {room: this.state.roomId, location: this.state.location});
            this.pendingSendLocation = false;
        }
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
        this._isMounted = true;
        if (this.props.match.params.groupLocation !== null && this.props.match.params.groupLocation !== undefined) {
            var groupLocation = this.props.match.params.groupLocation;
            console.log(this.id + ": " + groupLocation);
            this.setState({location: groupLocation});

            //send location to socket.io server
            if (this.socket.connected) {
                this.socket.emit("set_location", {room: this.state.roomId, location: groupLocation});
            } else {
                this.pendingSendLocation = true;
            }
            
            console.log(this.id + ": " + this.socket.id);

            //this.socket.emit("message", {room: this.state.roomId, message: "hi"});
        }      

    }

    componentWillUnmount() {
        this._isMounted = false;
        this.socket.disconnect();
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
                                    disabled={this.state.canNotStart}
                                />
                            </form>
                            <div>
                                <h2> Group ID: {this.state.roomId}</h2>
                                <h2> Location: {this.state.location}</h2>
                                <h2> Status: {this.state.status}</h2>
                            </div>
                        </header>
                    </div>
                </Route>
            </Switch>
        )
    }
}

export default withRouter(Host)