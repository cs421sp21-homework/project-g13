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
const e = require("cors");

const roomsMap = new Map();

Room.set_emitReadySignalFunc((room) => {
  console.log("emit ready");
  io.to(room).emit("ready", true);
  //io.to(room).emit("message", {message: "ready"});
});
  

Room.emitRestaurantsFunc = function (room, data) {
  io.to(room).emit("get_restaurants", data);
}

io.on("connection", function (socket) {
  socket.emit("message", {message: "welcome to Food-Tinder"});

  socket.on("create_room", (room) => {
    console.log("create room" + room);
    socket.join(room);
    roomsMap.set(room, new Room(room, 1));
    //io.to(room).emit("message", {message: "this is a test"});
  });

  //set room location
  socket.on("set_location", (data) => {
    const { room, location } = data;
    console.log(socket.id + " sent location for room " + room);
    if (roomsMap.has(room)) {
      roomsMap.get(room).setLocation(location);
      io.to(room).emit("ready", false);
    }
    //io.to(room).emit("message", {message: "room location was set"});
  });

  socket.on("join_room", (roomId) => {
    console.log("client " + socket.id + " joined the room " + roomId);
    socket.join(roomId);

    var size = 0;
    if (roomsMap.has(roomId)) {
      const room = roomsMap.get(roomId);
      if (room.addMember()) {
        var restaurants = room.getRestaurants();
        io.to(roomId).emit("get_restaurants", JSON.stringify(restaurants));
      }
      size = room.size;
    } else {
      roomsMap.set(roomId, new Room(1));
      size = 1;
    }

    io.to(roomId).emit("room_size_changed", size);
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
  socket.on("got_restaurants", (room) => {
    if (roomsMap.has(room)) {
      roomsMap.get(room).receivedRestaurantData();
      console.log("client " + socket.id + " received restaurant data");
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

  socket.on("disconnecting", ()=> {
    console.log("client " + socket.id + " is disconnecting");
    var rooms = socket.rooms;
    rooms.forEach(element => {
      if (roomsMap.has(element)) {
        const room = roomsMap.get(element);
        room.memberLeft();
        console.log("client" + socket.id + " left room " + element);
        io.to(element).emit("room_size_changed", room.size);
      }
    });
  });

});

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
