import "./App.css";
import { withRouter } from "react-router-dom";
import React, { Component, useRef, useEffect, useState } from "react";
import io from "socket.io-client";

function GroupPage() {
  let [rooms, setRooms] = useState(["A", "B", "C"]);
  let [room, setRoom] = useState("");
  let [name, setName] = useState("");
  let [roomName, setRoomName] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:4000", {
      withCredentials: true,
    });

    socket.on("set-session-acknowledgement", function (data) {
      sessionStorage.setItem("sessionId", data.sessionId);
      console.log("Set Acknowledgement Works!");
    });

    if (room) {
      socket.emit("join_room", { room, name });
      sessionStorage.setItem("RoomID", room);
    }

    socket.on("message", (message) => {
      console.log(message);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [room, rooms]);

  function joinRoom(name) {
    console.log(name);
    console.log(room);
  }

  return (
    <div>
      <h1>Room: {room}</h1>
      {rooms.map((r, i) => (
        <button onClick={() => setRoom(r)} key={i}>
          {r}
        </button>
      ))}
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => joinRoom(name)}>Join Room</button>
      <input
        type="text"
        name="name"
        placeholder="Enter Group ID"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={() => setRooms(rooms.concat(roomName))}>
        Create Room
      </button>
    </div>
  );
}

export default withRouter(GroupPage);
