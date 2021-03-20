const express = require("express");
const app = express();
//const http = require("http");
//const server = http.createServer(app);
const cors = require("cors");
app.use(cors());
const socketio = require("socket.io");
const { uuid } = require("uuidv4");

const server = require("http").createServer();
const options = {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
};
const io = require("socket.io")(server, options);

const PORT = 4000 || process.env.PORT;

const socketMap = {};

//import { emit } from "process";
const Room = require("./Room.js");

const roomsMap = new Map();

Room.set_emitReadySignalFunc((room) => {
  console.log("emit ready");
  io.to(room).emit("ready");
  io.to(room).emit("message", {message: "ready"});
});
  

Room.emitRestaurantsFunc = function (room, data) {
  io.to(room).emit("restaurants", data);
}

io.on("connection", function (socket) {
  socket.emit("message", {message: "welcome to Food-Tinder"});

  socket.on("create_room", (room) => {
    console.log("create room");
    socket.join(room);
    roomsMap.set(room, new Room(room, 1));
    //io.to(room).emit("message", {message: "this is a test"});
    socket.emit("message", {message: "this is a test"});
  });

  //set room location
  socket.on("set_location", (data) => {
    console.log("set location");
    console.log(socket.id + " sent location");
    const { room, location } = data;
    if (roomsMap.has(room)) {
      roomsMap.get(room).setLocation(location);
    }
    io.to(room).emit("message", {message: "this is a test"});
  });

  socket.on("join_room", (data) => {
    console.log("user joined the room");
    socket.join(data.room);

    if (roomsMap.has(data.room)) {
      const r = roomsMap.get(data.room);
      if (r.ready) {
        console.log("sent ready");
        socket.emit("ready");
      }
      /*if (roomsMap.get(data.room).addMember()) {
        var restaurants = roomsMap.get(data.room).getRestaurants();
        io.to(data.room).emit(JSON.stringify(restaurants));
      }*/
    } else {
      roomsMap.set(data.room, new Room(1));
    }
    //console.log(data.room);

    const rooms = io.of("/").adapter.rooms;
    //console.log(rooms);
    if (socketMap[data.room] === undefined) {
      socketMap[data.room] = [];
    }
    if (data.name !== "") {
      socketMap[data.room].push(data.name);
    }
    console.log(socketMap);
  });

  socket.on("message", (data) => {
    //Use to emit messages to all users connected
    const { room, message } = data;
    socket.to(room).emit("message", {
      message,
    });
  });

  //when a client wants restaurants
  socket.on("get_restaurant", (data) => {
    if (roomsMap.has(data.room)) {
      var rooms = roomsMap.get(data.room).getRestaurants();
      io.to(data.room).emit(JSON.stringify(rooms));
    }
  });

  //when a client receives restaurant data
  socket.on("got_restaurant", async (data) => {
    if (roomsMap.has(data.room)) {
      //TO-DO
    }
  });

  //when a client sends a vote
  socket.on("vote", (data) => {
    if (roomsMap.has(data.room)) {
      if (roomsMap.get(data.room).addVote(data.restaurantId)) {
        io.to(data.room).emit("match_found");
      }
    }
  });

});

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
