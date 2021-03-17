import "./App.css";
import { withRouter } from "react-router-dom";
import React, { Component, useRef, useEffect, useState } from "react";
import io from "socket.io-client";

function GroupPage() {
  const [response, setResponse] = useState("");

  const socket = io("http://localhost:4000", {
    withCredentials: true,
  });

  useEffect(() => {
    socket.on("create_room", (message) => {
      console.log(message);
    });

    socket.on("message", (message) => {
      console.log(message);
    });
  }, []);

  function joinRoom(event) {
    socket.emit("join_room", "room 1");
    console.log("whats up");
    socket.on("message", (message) => {
      console.log(message);
    });
  }

  return (
    <div>
      <button onClick={joinRoom}>Join a room</button>
    </div>
  );
}

export default withRouter(GroupPage);
