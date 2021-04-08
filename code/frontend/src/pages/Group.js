import "../App.css";
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import Join from "../components/Join.js";
import Host from "../components/Host.js";
import SetLocation from "../components/SetLocation.js";
import MatchFound from "../components/MatchFound.js";
import Card from "../components/card.js";
import NotFoundRec from "./NotFoundRec.js";
import NotFound from "./NotFound.js"
import SetFilters from "./SetFilters.js"
import io from "socket.io-client";
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
        height: 64,
        fontSize: 24,
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

//Contains join page, host page
class Group extends Component {
    constructor(props) {
        super(props);
        const isHost = this.props.isHost == null ? true : this.props.isHost;
        const initalLocation = isHost ? "Not Set" : "Host sets location";
        const initialPage = isHost ? "host" : "join";
        const initialStatus = isHost ? "Please set the location" : "";
        //console.log(isHost);
        //console.log(this.props.isHost);
        this.state = {
            page: initialPage,
            message: initialStatus,
            isHost: isHost,
            roomId: "Waiting for server...",
            location: initalLocation,
            numMembers: 1,
            canStartSwipingEvent: false,
            currentRestaurantIndex: 0,
            recommendation: "No recommendation found",
            topVotes: "No votes found",
            offset: 0,
        };

        /*localStorage.ge

        const isHost = (this.props.isHost == null) ? true : this.props.isHost;
        const initalLocation = (isHost) ?  "Not Set" : "Host sets location"; 
        const initialPage = (isHost) ? "host" : "join";
        const initialStatus = (isHost) ? "Please set the location" : "";
        //console.log(isHost);
        //console.log(this.props.isHost);
        this.state = {
            page: initialPage,
            message: initialStatus,
            isHost: isHost,
            roomId: "Waiting for server...",
            location: initalLocation,
            numMembers: 1,
            canStartSwipingEvent: false,
            currentRestaurantIndex: 0,
        }*/
        this.setInitialData();
        this.onJoinRoom = this.onJoinRoom.bind(this);
        this.onSetLocation = this.onSetLocation.bind(this);
        this.openSetLocation = this.openSetLocation.bind(this);
        this.onBackFromSetLocation = this.onBackFromSetLocation.bind(this);
        this.startSwipingEvent = this.startSwipingEvent.bind(this);
        this.onDislikeRestaurant = this.onDislikeRestaurant.bind(this);
        this.onLikeRestaurant = this.onLikeRestaurant.bind(this);

        this.restaurants = [];
        this.filters = new Map();
        this.filters.set("prices", []);
        this.filters.set("ratings", []);
        this.filters.set("cuisines", []);
        this.filters.set("categories", []);
        this.isFinished = false;

        //socket.io stuff
        const useLocalSocketServer = false;
        const socketServer = (useLocalSocketServer) ? "http://localhost:4000" : "https://chicken-tinder-13-socketio.herokuapp.com";
        this.socket = io(socketServer, {
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

        this.socket.on("finished", (data) => this.onReceiveFinished(data));
    }

    onJoinRoom(room) {
        if (room == null || room === "") {
            this.setState({message: "Please enter a group ID"});
        } else if (this.state.message !==  "Joining...") {
            //check if group exists
            this.socket.emit("room_exists", room);
            this.setState({message: "Joining..."})
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
        this.socket.emit("set_location", {room: this.state.roomId, location: data.location, radius: data.radius, offset: this.state.offset});
        this.setState({page: "host", location: data.location, message: "Loading data...", canStartSwipingEvent: false});
    }

    onDislikeRestaurant() {
        console.log("restaurants length: " + this.restaurants.length);
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
  

  onSetLocation(data) {
    this.socket.emit("set_location", {
      room: this.state.roomId,
      location: data.location,
      radius: data.radius,
      offset: this.state.offset,
    });
    this.setState({
      page: "host",
      location: data.location,
      message: "Waiting to receive data from server...",
      canStartSwipingEvent: false,
    });
  }

  onBackFromSetLocation() {
    this.setState({ page: "host" });
  }

  onVote() {
    if (this.state.currentRestaurantIndex + 1 < this.restaurants.length) {
      this.setState({
        currentRestaurantIndex: this.state.currentRestaurantIndex + 1,
      });
    } else if (!this.isFinished) {
      //go to waiting page
      this.socket.emit("finished", this.state.roomId);
      this.setState({ page: "waiting" });
    } else {
      //go to no match found page
      this.setState({ page: "no_match_found" });
    }
  }

  onLikeRestaurant() {
    this.socket.emit("yes_vote", {
      room: this.state.roomId,
      restaurantId: this.restaurants[this.state.currentRestaurantIndex].id,
    });
    this.onVote();
  }

  onDislikeRestaurant() {
    this.socket.emit("no_vote", {
      room: this.state.roomId,
      restaurantId: this.restaurants[this.state.currentRestaurantIndex].id,
    });
    this.onVote();
  }

  onTryAgain() {
    /*if (this.state.isHost) {
            this.setState({page: "host"});
        } else {
            this.setState({page: "join"});
        }*/
      this.setState({page: (this.state.isHost) ? "host" : "join"});
      if (this.state.isHost) {
          this.state.offset = (this.state.offset + 20) % 1000;
          this.onSetLocation({radius: this.state.radius, location: this.state.location});
      }
    }

    onSetFilters() {
        const categories = [...this.filters.get("cuisines")];
        
        const kosher = this.filters.get("kosher");
        if (kosher != null && kosher === true) categories.push("kosher");

        const vegan = this.filters.get("vegan");
        if (vegan != null && vegan === true) categories.push("vegan");

        const vegetarian = this.filters.get("vegetarian");
        if (vegetarian != null && vegetarian === true) categories.push("vegetarian");

        console.log("prices");
        console.log(categories);

        console.log("filters");
        console.log(this.filters);

        this.socket.emit("set_filters", {room: this.state.roomId, price: this.filters.get("prices"), categories: categories, 
                ratings: this.filters.get("ratings"), });
        
        var message = "";
        if (this.state.location !== "" && this.state.location !== "Not Set") {
            message = "Waiting to receive data from server...";
        } else {
            message = "Please set your location.";
        }
        this.setState({page: "host", message: message, canStartSwipingEvent: false});
    }

    render() {
        const page = this.state.page;
        const isHost = this.state.isHost;
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
                        openSetFilters={() => this.setState({page: "set_filters"})}
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
                <NotFoundRec
                    tryAgainVisible={this.state.isHost}
                    onTryAgain={() => this.onTryAgain()}
                    rec={this.state.recommendation}
                    topVotes={this.state.topVotes}
                />
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

            { page === "waiting_to_join" && 
                <div className="App">
                <header className="App-header">
                  <div>
                    <h1> Waiting for host to create the group... </h1>
                    <form>
                        <Button
                            className={this.props.classes.button}
                            onClick={() => this.props.history.push("/")}
                            variant="contained"
                            size='large'
                        >
                            Return Home
                        </Button>
                    </form>
                    </div>
                </header>
                </div>
            }

            { page === "set_filters" &&
                <SetFilters onBack={() => this.setState({page: "host"})} 
                            filters={this.filters} onSubmit={() => this.onSetFilters()}
                />

            }

            </div>
        )
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    //socket.io functions

    onSocketConnect() {
        //console.log(this.state);
        if (this.state.isHost != null && this.state.isHost === true) {
            if (this.needsNewRoomId) {
                //send a request to the server to get the room id
                this.socket.emit("create_room_and_get_id");
            } else {
                this.socket.emit("create_room", this.state.roomId);
            }
        } else {
            //join the room with the room id
            if (!this.needsNewRoomId) {
                this.socket.emit("room_exists", this.state.roomId);
            }
        }
    }

    onReceiveRoomId(roomId) {
        //console.log("received signal");
        if (this.state.roomId === "Waiting for server...") {
            this.setState({roomId: roomId});
            sessionStorage.setItem("roomId", this.state.roomId);
            sessionStorage.setItem("isHost", "true");
            console.log("session host " + sessionStorage.getItem("roomId"));
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
                sessionStorage.setItem("roomId", this.state.roomId);
                sessionStorage.setItem("isHost", "false");
            } else {
                this.setState({message: "This Group ID does not exist."});
            }
        } else if (this.state.page === "waiting_to_join") {
            if (data.exists === true) {
                this.socket.emit("join_room", data.roomId);
                this.setState({roomId: data.roomId, message: "Not Ready", page: "host"});
                sessionStorage.setItem("roomId", this.state.roomId);
                sessionStorage.setItem("isHost", "false");
            } else {
                //send another request to check if the room exists
                setTimeout(() => {
                    this.socket.emit("room_exists", this.state.roomId);
                }, 1000);
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
            message = "Could not parse restaurant data. Please try another location.";
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
        if (
          this.restaurants[i] != null &&
          this.restaurants[i].id === restaurant
        ) {
          this.state.currentRestaurantIndex = i;
          break;
        }
      }

      this.setState({ page: "match_found" });
    }
  }

    onReceiveFinished(data) {
        //go to no match found page
        this.setState({ recommendation: data.rec, topVotes: data.topVotes, page: "no_match_found" });
    }

    onReceiveMessage(data) {
        console.log(data);
    }

    //check the local session if the user is a host
    setInitialData() {
        var isHost = sessionStorage.getItem("isHost");
        console.log("session host " + isHost);
        if (isHost == null) {
            isHost = (this.props.isHost == null) ? true : this.props.isHost;
        } else if (isHost === "true") {
            isHost = true; 
        } else {
            isHost = false;
        }

        var roomId = sessionStorage.getItem("roomId");
        console.log("session room " + roomId);
        this.needsNewRoomId = (roomId == null) ? true : false;
        if (roomId == null) {
            roomId = "Waiting for server...";
        }

        var initialLocation;
        var initialPage = (isHost) ? "host" : "join";
        var initialStatus;
        if (isHost) {
            initialPage = "host";
            initialLocation = "Not Set";
            initialStatus = "Please set the location";
        } else {
            initialPage = (this.needsNewRoomId) ? "join" : "waiting_to_join";
            initialStatus = "";
            initialLocation = "Host sets location"; 
        }

        this.state = {
            page: initialPage,
            message: initialStatus,
            isHost: isHost,
            roomId: roomId,
            location: initialLocation,
            numMembers: 1,
            canStartSwipingEvent: false,
            currentRestaurantIndex: 0,
            offset: 0,
        }
    }

    filterRestaurants() {
        const prices = this.filters.get("prices");
        if (prices.length > 0) {
            for (let i=0; i<this.restaurants.length; i++) {
                const restaurant = this.restaurants[i];
                var fits = false;
                for (let j=0; j<prices.length; j++) {
                    const desiredRating = prices[j];
                    if (restaurant.rating >= desiredRating && restaurant <= desiredRating + 1) {
                        fits = true;
                        break;
                    }
                }

                if (fits === false) {
                    this.restaurants.splice(i, 1);
                    i--;
                }
            }
        }
    }
}

export default withRouter((withStyles(styles)(Group)));
