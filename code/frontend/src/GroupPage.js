import "./App.css";
import { withRouter } from "react-router-dom";
import React, { Component, useRef, useEffect, useState } from "react";
import io from "socket.io-client";

function GroupPage() {
  let [rooms, setRooms] = useState(["A", "B", "C"]);
  let [room, setRoom] = useState(rooms[0]);
  let [name, setName] = useState("");
  let [roomName, setRoomName] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:4000", {
      withCredentials: true,
    });

    if (room) {
      socket.emit("join_room", room);
    }

    socket.on("message", (message) => {
      console.log(message);
    });
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
