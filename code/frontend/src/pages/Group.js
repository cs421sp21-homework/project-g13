import "../App.css";
import React, { Component, createRef } from "react";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import Join from "../components/Join.js";
import Host from "../components/Host.js";
import SetLocation from "../components/SetLocation.js";
import MatchFound from "../components/MatchFound.js";
import Card from "../components/card.js";
import NotFoundRec from "./NotFoundRec.js";
import RequestNickname from "../components/RequestNickname.js"
import SetFilters from "./SetFilters.js";
import io from "socket.io-client";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//Contains join page, host page
class Group extends Component {
  constructor(props) {
    super(props);
    
    //set inital data here (props, state, etc.)
    this.setInitialData();

    this.onJoinRoom = this.onJoinRoom.bind(this);
    this.onSetLocation = this.onSetLocation.bind(this);
    this.openSetLocation = this.openSetLocation.bind(this);
    this.onBackFromSetLocation = this.onBackFromSetLocation.bind(this);
    this.startSwipingEvent = this.startSwipingEvent.bind(this);
    this.onDislikeRestaurant = this.onDislikeRestaurant.bind(this);
    this.onLikeRestaurant = this.onLikeRestaurant.bind(this);

    this.restaurants = [];
    this.matches = [];
    this.filters = new Map();
    this.filters.set("prices", []);
    this.filters.set("ratings", []);
    this.filters.set("cuisines", []);
    this.filters.set("categories", []);
    this.isFinished = false;

    this.joinPage = createRef();

    //socket.io stuff
    const useLocalSocketServer = false;
    const socketServer = useLocalSocketServer
      ? "http://localhost:4000"
      : "https://chicken-tinder-13-socketio.herokuapp.com";
    this.socket = io(socketServer, {
      withCredentials: true,
    });

    this.socket.on("connect", () => this.onSocketConnect());

    this.socket.on("room_id", (data) => this.onReceiveRoomId(data));

    this.socket.on("room_exists", (data) => this.onReceiveRoomExists(data));

    this.socket.on("message", (data) => this.onReceiveMessage(data));

    this.socket.on("room_size_changed", (data) =>
      this.onReceiveRoomSizeChanged(data)
    );

    this.socket.on("get_restaurants", (data) =>
      this.onReceiveGetRestaurants(data)
    );

    this.socket.on("host_left", () => alert("Host has left the room."));

    this.socket.on("ready", (data) => this.onReceiveReady(data));

    this.socket.on("start_event", () => this.startSwipingEvent());

    this.socket.on("match_found", (data) => this.onReceiveMatchFound(data));

    this.socket.on("finished", (data) => this.onReceiveFinished(data));
  }

  onJoinRoom(room) {
    if (room == null || room === "") {
      this.setState({ message: "Please enter a group ID" });
    } else if (this.state.message !== "Joining...") {
      //check if group exists
      this.socket.emit("room_exists", room);
      this.setState({ message: "Joining..." });
    }
  }

  onSetNicknameWithRoomId = (nickname, roomId) => {
    this.name = nickname;
    this.socket.emit("room_exists", roomId);
    this.setState({ message: "Joining..." });
  };

  onSetNickname = (nickname) => {
    this.name = nickname;
    this.onSocketConnect();
    this.setState({showAskForNickname: false});
  };

  openSetLocation() {
    this.setState({ page: "set_location" });
  }

  startSwipingEvent() {
    console.log("start swiping event");
    if (this.state.isHost) {
      this.socket.emit("start_event", this.state.roomId);
    }
    if (
      this.state.page !== "show_restaurant" &&
      this.state.canStartSwipingEvent
    ) {
      this.setState({ page: "show_restaurant", currentRestaurantIndex: 0 });
    }
  }

  onDislikeRestaurant() {
    console.log("restaurants length: " + this.restaurants.length);
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
      message: "Fetching restaurant data...",
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
    if (this.state.numMembers !== 1) {
      this.onVote();
    }
  }

  onDislikeRestaurant() {
    this.socket.emit("no_vote", {
      room: this.state.roomId,
      restaurantId: this.restaurants[this.state.currentRestaurantIndex].id,
    });
    this.onVote();
  }

  onTryAgain() {
    this.isFinished = false;
    this.setState({ page: this.state.isHost ? "host" : "join" });
    if (this.state.isHost) {
      this.state.offset = (this.state.offset + 20) % 1000;
      this.onSetLocation({
        radius: this.state.radius,
        location: this.state.location,
      });
    }
  }

  onSetFilters() {
    const categories = [...this.filters.get("cuisines")];

    const kosher = this.filters.get("kosher");
    if (kosher != null && kosher === true) categories.push("kosher");

    const vegan = this.filters.get("vegan");
    if (vegan != null && vegan === true) categories.push("vegan");

    const vegetarian = this.filters.get("vegetarian");
    if (vegetarian != null && vegetarian === true)
      categories.push("vegetarian");

    //onsole.log("prices");
    //console.log(categories);

    //console.log("filters");
    //console.log(this.filters);

    this.socket.emit("set_filters", {
      room: this.state.roomId,
      price: this.filters.get("prices"),
      categories: categories,
      ratings: this.filters.get("ratings"),
    });

    var message = "";
    if (this.state.location !== "" && this.state.location !== "Not Set") {
      message = "Fetching restaurant data...";
    } else {
      message = "Please first set your location.";
    }
    this.setState({
      page: "host",
      message: message,
      canStartSwipingEvent: false,
    });
  }

  render() {
    const page = this.state.page;
    console.log("page " + page);
    const isHost = this.state.isHost;
    //console.log("message:" + this.state.message);
    //console.log(this.state);
    return (
      <div>
        {page === "join" && (
          <Join onSubmit={this.onJoinRoom} statusMessage={this.state.message} setNickname={this.onSetNicknameWithRoomId}
            ref={this.joinPage}
          />
        )}
        {page === "host" && (
          <Host
            setLocation={this.openSetLocation}
            startSwipingEvent={this.startSwipingEvent}
            isHost={this.state.isHost}
            roomId={this.state.roomId}
            location={this.state.location}
            numMembers={this.state.numMembers}
            memberNames={this.state.memberNames}
            status={this.state.message}
            canStartSwipingEvent={
              this.state.isHost && this.state.canStartSwipingEvent
            }
            openSetFilters={() => this.setState({ page: "set_filters" })}
          />
        )}

        {page === "set_location" && (
          <SetLocation
            onSubmit={this.onSetLocation}
            onBack={this.onBackFromSetLocation}
          />
        )}

        {page === "show_restaurant" && (
          <div className="App">
            <Card
              restaurant={this.restaurants[this.state.currentRestaurantIndex]}
              onDislike={this.onDislikeRestaurant}
              onLike={this.onLikeRestaurant}
              cardType="regular"
            />
          </div>
        )}

        {page === "match_found" && (
          <MatchFound
            restaurant={this.restaurants[this.state.currentRestaurantIndex]}
            oldMatches={this.matches}
            onDone={() => this.props.history.push("/")}
            onContinue={() => {
              this.matches.push(this.restaurants[this.state.currentRestaurantIndex])
              this.onTryAgain();
            }}
          />
        )}

        {page === "no_match_found" && (
          <NotFoundRec
            tryAgainVisible={this.state.isHost}
            onTryAgain={() => this.onTryAgain()}
            rec={this.state.recommendation}
            topVotes={this.state.topVotes}
          />
        )}

        {page === "waiting" && (
          <div className="App">
            <header className="App-header">
              <div>
                <h1> Waiting for other members to finish... </h1>
              </div>
            </header>
          </div>
        )}

        {page === "waiting_to_join" && (
          <div className="App">
            <header className="App-header">
              <div>
                <h1> Waiting for host to create the group... </h1>
                <form>
                  <button
                      className="btn btn-primary wide-btn"
                      onClick={() => this.props.history.push("/")}
                      >
                    Return Home
                  </button>
                </form>
              </div>
            </header>
          </div>
        )}

        {page === "set_filters" && (
          <SetFilters
            onBack={() => this.setState({ page: "host" })}
            filters={this.filters}
            onSubmit={() => this.onSetFilters()}
          />
        )}

        <RequestNickname show={this.state.showAskForNickname} setNickname={this.onSetNickname} />
      </div>
    );
  }

  componentWillUnmount() {
    this.socket.disconnect();
    console.log("unmounting");
  }

  //socket.io functions

  onSocketConnect() {
    //console.log(this.state);
    if (this.state.isHost != null && this.state.isHost === true && this.name !== "") {
      if (this.needsNewRoomId) {
        //send a request to the server to get the room id
        this.socket.emit("create_room_and_get_id", {name: this.name});
      } else {
        this.socket.emit("create_room", {roomId: this.state.roomId, name: this.name});
      }
    } else {
      //join the room with the room id
      if (!this.needsNewRoomId) {
        this.socket.emit("room_exists", this.state.roomId);
      }
    }
  }

  onReceiveRoomId(data) {
    //console.log("received signal");
    if (this.state.roomId === "Waiting for server...") {
      //console.log("room");
      //console.log(data);
      this.setState({ roomId: data.roomId, memberNames: data.memberNames });
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
        //join the room if the username is set
        if (this.name === "") {
          this.joinPage.current.askForNickname();
        } else {
          this.socket.emit("join_room", {roomId: data.roomId, name: this.name});
          this.setState({
            roomId: data.roomId,
            message: "Not Ready",
            page: "host",
          });
          sessionStorage.setItem("roomId", this.state.roomId);
          sessionStorage.setItem("isHost", "false");
        }
      } else {
        this.setState({ message: "This Group ID does not exist." });
      }
    } else if (this.state.page === "waiting_to_join") {
      if (data.exists === true) {
        this.socket.emit("join_room", {roomId: data.roomId, name: this.name});
        this.setState({
          roomId: data.roomId,
          message: "Not Ready",
          page: "host",
        });
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

  onReceiveRoomSizeChanged(data) {
    this.setState({ numMembers: data.newSize, memberNames: data.memberNames });
  }

  onReceiveGetRestaurants(restaurants) {
    console.log("got restaurant data");
    var message = "";
    //console.log(restaurants);
    try {
      this.restaurants = JSON.parse(restaurants);
      console.log(this.restaurants);

      if (this.restaurants.length > 0) {
        if (this.restaurants[0] === "err") {
          message = "An error occurred while loading restaurants. Please try again later or at another location.";
        } else {
          message = "Waiting for other members...";
          this.socket.emit("got_restaurants", this.state.roomId);
        }
      } else {
        message = "No restaurants found.";
      }
    } catch (err) {
      message = "An error occurred while loading restaurants. Please try again later or at another location.";
    }

    this.setState({ message: message, canStartSwipingEvent: false });
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
      console.log("Poopensharten");
      this.setState({ page: "match_found" });
    }
  }

  onReceiveFinished(data) {
    //go to no match found page
    this.setState({
      recommendation: data.rec,
      topVotes: data.topVotes,
      page: "no_match_found",
    });
  }

  onReceiveMessage(data) {
    console.log(data);
  }

  //check the local session if the user is a host
  setInitialData() {
    var isHost = sessionStorage.getItem("isHost");
    console.log("session host " + isHost);
    if (isHost == null) {
      isHost = this.props.isHost == null ? true : this.props.isHost;
    } else if (isHost === "true") {
      isHost = true;
    } else {
      isHost = false;
    }

    var roomId = sessionStorage.getItem("roomId");
    console.log("session room " + roomId);
    this.needsNewRoomId = roomId == null ? true : false;
    if (roomId == null) {
      roomId = "Waiting for server...";
    }

    this.name = localStorage.getItem("username");
    if (this.name === null || this.name === undefined) this.name = "";

    var initialLocation;
    var initialPage = isHost ? "host" : "join";
    var initialStatus;
    let initalShowAskForNickname = false;
    if (isHost) {
      initialPage = "host";
      initialLocation = "Not Set";
      initialStatus = "Please set the location";
      initalShowAskForNickname = this.name === "";
    } else {
      initialPage = this.needsNewRoomId ? "join" : "waiting_to_join";
      initialStatus = "";
      initialLocation = "Host sets location";
      initalShowAskForNickname = false;
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
      recommendation: "No recommendation found",
      topVotes: "No votes found",
      memberNames: [''],
      showAskForNickname: initalShowAskForNickname,
    };
  }

}

export default withRouter(Group);
