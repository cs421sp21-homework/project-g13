import "../App.css"
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import Join from "../components/Join.js"
import Host from "../components/Host.js"
import SetLocation from "../components/SetLocation.js"
import io from "socket.io-client";

//Contains join page, host page
class Group extends Component {
    constructor(props) {
        super(props);
        const isHost = (this.props.isHost == null) ? true : this.props.isHost;
        const initalLocation = (isHost) ?  "Not Set" : "Host sets location"; 
        const initialPage = (isHost) ? "host" : "join";
        //console.log(isHost);
        //console.log(this.props.isHost);
        this.state = {
            page: initialPage,
            message: "hi",
            isHost: isHost,
            roomId: "Waiting for server...",
            location: initalLocation,
            numMembers: 1,
            canStartSwipingEvent: false,
        }
        this.test = this.test.bind(this);
        this.onJoinRoom = this.onJoinRoom.bind(this);
        this.onSetLocation = this.onSetLocation.bind(this);
        this.openSetLocation = this.openSetLocation.bind(this);

        this.restaurants = [];

        //socket.io stuff
        this.socket = io("localhost:4000", {
            withCredentials: true,
          });

        this.socket.on("connect", () => this.onSocketConnect());

        this.socket.on("room_id", (data) => this.onReceiveRoomId(data));

        this.socket.on("room_exists", (data) => this.onReceiveRoomExists(data));

        this.socket.on("message", (data) => this.onReceiveMessage(data));

        this.socket.on("room_size_changed", (data) => this.onReceiveRoomSizeChanged(data));

        this.socket.on("get_restaurants", (data) => this.onReceiveGetRestaurants(data));
    }

    test(message) {
        console.log("yay!");
        this.setState({message: "beef"});
        console.log(this.state);
        //console.log("message:" + this.state.message);
    }

    onJoinRoom(room) {
        if (room == null || room === "") {
            this.setState({message: "Please enter a group ID"});
        } else if (this.state.message !==  "Waiting for response from server...") {
            //check if group exists
            this.socket.emit("room_exists", room);
            this.setState({message: "Waiting for response from server..."})
        }
    }

    openSetLocation() {
        this.setState({page: "set_location"});
    }

    startSwipingEvent() {

    }

    onSetLocation(data) {
        this.socket.emit("set_location", {room: this.state.roomId, location: data.location});
        this.setState({page: "host", location: data.location, message: "Waiting to receive data from server...", canStartSwipingEvent: false});
    }

    render() {
        const page = this.state.page;
        console.log("message:" + this.state.message);
        console.log(this.state);
        return (
            <div>
            { page === "join" &&
                <Join onSubmit={this.onJoinRoom} statusMessage={this.state.message} />
            }
            { page === "host" &&
                <Host setLocation={this.openSetLocation} startSwipingEvent={this.startSwipingEvent} 
                        isHost={this.state.isHost} roomId={this.state.roomId} location={this.state.location}
                        numMembers={this.state.numMembers} status={this.state.message} 
                        canStartSwipingEvent={this.state.canStartSwipingEvent}
                />
            }

            { page === "set_location" &&
                <SetLocation onSubmit={this.onSetLocation} />
            }

            </div>
        )
    }


    //socket.io functions

    onSocketConnect() {
        //console.log(this.state);
        if (this.state.isHost != null && this.state.isHost === true) {
            //send a request to the server to get the room id
            this.socket.emit("create_room_and_get_id");
        }
    }

    onReceiveRoomId(roomId) {
        //console.log("received signal");
        if (this.state.roomId === "Waiting for server...") {
            this.setState({roomId: roomId});
            //console.log("received room id");
        }
    }

    onReceiveRoomExists(data) {
        console.log("room_exists");
        if (this.state.page === "join") {
            if (data.exists === true && !this.setState.isHost) {
                //join the room
                this.socket.emit("join_room", data.roomId);
                this.setState({roomId: data.roomId, message: "Not Ready", page: "host"});
            } else {
                this.setState({message: "This Room ID does not exist."});
            }
        }
    }

    onReceiveRoomSizeChanged(newSize) {
        this.setState({numMembers: newSize});
    }

    onReceiveGetRestaurants(restaurants) {
        console.log("got restaurant data");
        var message = "";
        try {
            this.restaurants = JSON.parse(data);
            //console.log(this.restaurants);

            if (this.restaurants.length > 0) {
                if (this.restaurants[0] === "err") {
                   message = "Received invalid restaurant data";
                } else {
                    message = "Waiting for other members...";
                    this.socket.emit("got_restaurants", this.state.roomId);
                }
            } else {
                message = "Received no restaurant data";
            }

        } catch (err) {
            message = "Received invalid restaurant data";
        }

        this.setState({message: message, canStartSwipingEvent: false});
    } 

    onReceiveMessage(data) {
        console.log(data);
    }
}

export default withRouter(Group);