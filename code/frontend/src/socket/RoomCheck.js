import "../App.css";
import { withRouter } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import io from "socket.io-client";

function RoomCheck() {
  let [room, setRoom] = useState(sessionStorage.getItem("RoomID"));
  useEffect(() => {
    const socket = io("http://localhost:4000", {
      withCredentials: true,
    });

    if (room) {
      socket.emit("join_room", { room, name: "Test" });
      console.log("hello");
      console.log(room);
    }

    socket.on("message", (message) => {
      console.log(message);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h1>Room You are in: </h1>
      <h1> {room}</h1>
    </div>
  );
}

export default withRouter(RoomCheck);
