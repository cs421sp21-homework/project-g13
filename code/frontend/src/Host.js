import "./App.css";
import React, { Component } from "react";
import { Switch, Route, generatePath } from "react-router";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import ListRestaurant from "./ListRestaurant";

class Host extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this._isHost = false;
    this.id = Host.id;
    Host.id++;
    this.pendingSendLocation = false;
    this.pendingJoinRoom = false;
    this.pendingCreate = false;

    //socket.io stuff
    this.socket = io("http://localhost:4000", {
      withCredentials: true,
    });

    this.socket.on("ready", (data) => {
      this.onReady(data);
    });

    this.socket.on("message", (data) => {
      const { message } = data;
      console.log(this.id + ": " + message);
    });

    this.socket.on("connect", () => {
      this.socketOnConnect();
    });

    this.socket.on("get_restaurants", (data) => {
      this.onGetRestaurants(data);
    });

    this.socket.on("room_size_changed", (data) => {
      this.setState({ numMembers: data });
    });

    this.socket.on("start-event", () => {
      this.onStartEvent();
    });

    var isHost = sessionStorage.getItem("isHost");
    var roomId = sessionStorage.getItem("roomId");
    if (isHost === null && roomId === null) {
      roomId = "" + Math.floor(Math.random() * 1000 + 1);
      this.createRoom(roomId);
      sessionStorage.setItem("isHost", "true");
      sessionStorage.setItem("roomId", roomId);
    } else {
      console.log(roomId);
      this.joinRoom(roomId);
      this._isHost = true;
    }

    this.state = {
      roomId: roomId,
      location: "Not Set",
      canNotStart: true,
      status: "Not Ready",
      numMembers: 1,
      restaurants: [],
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
      this.socket.emit("set_location", {
        room: this.state.roomId,
        location: this.state.location,
      });
      this.pendingSendLocation = false;
    }
  }

  onGetRestaurants(data) {
    console.log("got restaurant data");
    try {
      this.restaurants = JSON.parse(data);
      console.log(this.restaurants);
      this.setState({ restaurants: this.restaurants });
    } catch (err) {
      this.setState({ status: "Received invalid restaurant data" });
    }

    if (this.restaurants.length > 0) {
      if (this.restaurants[0] === "err") {
        this.setState({ status: "Received invalid restaurant data" });
      } else {
        this.setState({ status: "Received restaurant data" });
        this.socket.emit("got_restaurants", this.state.roomId);
      }
    } else {
      this.setState({ status: "Received no restaurant data" });
    }
  }

  onReady(data) {
    console.log("recieved ready event");
    console.log(this._isMounted);
    if (data) {
      this.setState({ canNotStart: !data, status: "Ready" });
    } else {
      this.setState({ canNotStart: !data });
    }
  }

  onStartEvent() {
    this.props.history.push("/Location/ListRestaurants", this.state);
  }

  start() {
    //begin selection process for every group member.
    console.log("restaurant data below");
    console.log(this.restaurants);
    //this.props.history.push("/Location/ListRestaurants", this.restaurantData);
    this.socket.emit("start-event", this.state.roomId);
    this.props.history.push("/Location/ListRestaurants", this.state);
    return;
  }

  setLocation() {
    this.props.history.push({
      pathname: generatePath("/Location/Host"),
    });
  }

  componentDidMount() {
    this._isMounted = true;
    if (
      this.props.match.params.groupLocation !== null &&
      this.props.match.params.groupLocation !== undefined
    ) {
      var groupLocation = this.props.match.params.groupLocation;
      console.log(this.id + ": " + groupLocation);
      this.setState({ location: groupLocation });

      //send location to socket.io server
      if (this.socket.connected) {
        this.socket.emit("set_location", {
          room: this.state.roomId,
          location: groupLocation,
        });
      } else {
        this.pendingSendLocation = true;
      }

      //console.log(this.id + ": " + this.socket.id);

      //this.socket.emit("message", {room: this.state.roomId, message: "hi"});
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.socket.disconnect();
  }

  render() {
    return (
      <Switch>
        <Route path="/Host">
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
                  onClick={() => this.setLocation()}
                />
                <br />
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
                <h2> Members: {this.state.numMembers}</h2>
                <h2> Status: {this.state.status}</h2>
              </div>
            </header>
          </div>
        </Route>
        <Route path="/ListRestaurants">
          <ListRestaurant />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(Host);
