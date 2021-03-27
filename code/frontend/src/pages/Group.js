import "../App.css"
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import Join from "../components/Join.js"
import Host from "../components/Host.js"
import SetLocation from "../components/SetLocation.js"
import MatchFound from "../components/MatchFound.js"
import Card from "../components/card.js"
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
            currentRestaurantIndex: 0,
        }
        this.onJoinRoom = this.onJoinRoom.bind(this);
        this.onSetLocation = this.onSetLocation.bind(this);
        this.openSetLocation = this.openSetLocation.bind(this);
        this.onBackFromSetLocation = this.onBackFromSetLocation.bind(this);
        this.startSwipingEvent = this.startSwipingEvent.bind(this);
        this.onDislikeRestaurant = this.onDislikeRestaurant.bind(this);
        this.onLikeRestaurant = this.onLikeRestaurant.bind(this);

        this.restaurants = [];
        this.isFinished = false;

        //socket.io stuff
        this.socket = io("https://chicken-tinder-13-socketio.herokuapp.com", {
            withCredentials: true,
          });

        this.socket.on("connect", () => this.onSocketConnect());

        this.socket.on("room_id", (data) => this.onReceiveRoomId(data));

        this.socket.on("room_exists", (data) => this.onReceiveRoomExists(data));

        this.socket.on("message", (data) => this.onReceiveMessage(data));

        this.socket.on("room_size_changed", (data) => this.onReceiveRoomSizeChanged(data));

        this.socket.on("get_restaurants", (data) => this.onReceiveGetRestaurants(data));

        this.socket.on("ready", (data) => this.onReceiveReady(data));

        this.socket.on("start_event", () => this.startSwipingEvent());

        this.socket.on("match_found", (data) => this.onReceiveMatchFound(data));

        this.socket.on("finished", () => this.onReceiveFinished());
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
        console.log("start swiping event");
        if (this.state.isHost) {
            this.socket.emit("start_event", this.state.roomId);
        }
        if (this.state.page !== "show_restaurant" && this.state.canStartSwipingEvent) {
            this.setState({page: "show_restaurant", currentRestaurantIndex: 0});
        }
    }

    onSetLocation(data) {
        this.socket.emit("set_location", {room: this.state.roomId, location: data.location, radius: data.radius});
        this.setState({page: "host", location: data.location, message: "Waiting to receive data from server...", canStartSwipingEvent: false});
    }

    onBackFromSetLocation() {
        this.setState({page: "host"});
    }

    onDislikeRestaurant() {
        if (this.state.currentRestaurantIndex + 1 < this.restaurants.length) {
            this.setState({currentRestaurantIndex: this.state.currentRestaurantIndex+1});
        } else if (!this.isFinished) {
            //go to waiting page
            this.socket.emit("finished", this.state.roomId);
            this.setState({page: "waiting"});
        } else {
            //go to no match found page
            this.setState({page: "no_match_found"});
        }
    }

    onLikeRestaurant() {
        this.socket.emit("vote", {room: this.state.roomId, restaurantId: this.restaurants[this.state.currentRestaurantIndex].id});
        this.onDislikeRestaurant();
    }

    onTryAgain() {
        /*if (this.state.isHost) {
            this.setState({page: "host"});
        } else {
            this.setState({page: "join"});
        }*/
        location.reload();
    }

    render() {
        const page = this.state.page;
        //console.log("message:" + this.state.message);
        //console.log(this.state);
        return (
            <div>
            { page === "join" &&
                <Join onSubmit={this.onJoinRoom} statusMessage={this.state.message} />
            }
            { page === "host" &&
                <Host setLocation={this.openSetLocation} startSwipingEvent={this.startSwipingEvent} 
                        isHost={this.state.isHost} roomId={this.state.roomId} location={this.state.location}
                        numMembers={this.state.numMembers} status={this.state.message} 
                        canStartSwipingEvent={this.state.isHost && this.state.canStartSwipingEvent}
                />
            }

            { page === "set_location" &&
                <SetLocation onSubmit={this.onSetLocation} onBack={this.onBackFromSetLocation} />
            }

            { page === "show_restaurant" && 
                <div className="App-header">
                <Card
                  restaurant={this.restaurants[this.state.currentRestaurantIndex]}
                  onDislike={this.onDislikeRestaurant}
                  onLike={this.onLikeRestaurant}
                />
                </div>
            }

            { page === "match_found" &&
                <MatchFound  restaurant={this.restaurants[this.state.currentRestaurantIndex]} 
                onDone={() => this.props.history.push("/")} />
            }

            { page === "no_match_found" &&
                <div className="App">
                <header className="App-header">
                    <h1>No match found.</h1>
                    <h2>Try again?</h2>
                    <form>
                        <input
                            type="button"
                            value="Yes"
                            onClick={() => this.onTryAgain()}
                        />
                        <input
                            type="button"
                            value="No"
                            onClick={() => this.props.history.push("/")}
                        />
                    </form>
                </header>
                </div>
            }

            { page === "waiting" && 
                <div className="App">
                <header className="App-header">
                  <div>
                    <h1> Waiting for other members to finish... </h1>
                    </div>
                </header>
                </div>
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
        console.log(restaurants);
        try {
            this.restaurants = JSON.parse(restaurants);
            console.log(this.restaurants);

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
            message = "Could not parse restaurant data";
        }

        this.setState({message: message, canStartSwipingEvent: false});
    }
    
    onReceiveReady(data) {
        console.log("recieved ready event");
        //console.log(this._isMounted);
        console.log("data: " + data);
        if (data) {
          this.setState({ canStartSwipingEvent: data, message: "Ready" });
        } else {
          this.setState({ canStartSwipingEvent: data });
        }
    }

    onReceiveMatchFound(restaurant) {
        if (restaurant != null && restaurant !== "") {
            //search for restaurant with same id
      
            for (var i = 0; i < this.restaurants.length; i++) {
              if (this.restaurants[i] != null && this.restaurants[i].id === restaurant) {
                this.state.currentRestaurantIndex = i;
                break;
              }
            }
      
            this.setState({page: "match_found"});
          }
    }

    onReceiveFinished() {
        //go to no match found page
        this.setState({page: "no_match_found"});
    }

    onReceiveMessage(data) {
        console.log(data);
    }
}

export default withRouter(Group);