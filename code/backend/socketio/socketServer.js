const express = require("express");
const app = express();
//const http = require("http");
//const server = http.createServer(app);
const cors = require("cors");
app.use(cors());
const socketio = require("socket.io");

const server = require("http").createServer();
const options = {
  transports: ["websocket", "polling", "flashsocket"],
  cors: {
    origin: [
      "http://localhost:3000",
      "http://chicken-tinder-13.herokuapp.com",
      "https://chicken-tinder-13.herokuapp.com",
    ],
    credentials: true,
  },
};

const io = require("socket.io")(server, options);

const PORT = process.env.PORT || 4000;

const socketMap = {};

let hostID = "";

//import { emit } from "process";
const Room = require("./Room.js");
const e = require("cors");
const { func } = require("prop-types");

const roomsMap = new Map();

Room.set_emitReadySignalFunc((room, ready) => {
  console.log("emit ready");
  io.to(room).emit("ready", ready);

  //io.to(room).emit("message", {message: "ready"});
});

Room.emitRestaurantsFunc = function (room, data) {
  io.to(room).emit("get_restaurants", data);
  console.log("sent restaurant data to room " + room);
};

Room.emitFinishedFunc = function (room) {
  let rec = roomsMap.get(room).getRec();
  let topVotes = roomsMap.get(room).getTopVotes();
  io.to(room).emit("finished", { rec: rec, topVotes: topVotes });
  console.log("sent finished signal to room " + room);
};

Room.emitMatchFoundfunc = function (room, restaurantId) {
  if (roomsMap.has(room)) {
    if (roomsMap.get(room).restaurantYesVotes.get(restaurantId) >= roomsMap.get(room).size) {
      console.log("match found being emitted @ 59");
      io.to(room).emit("match_found", restaurantId);
    }
  }
};

Room.emitRecommendFunc = function (room, restaurantId) {
  io.to(room).emit("recommend", restaurantId);
};

io.on("connection", function (socket) {
  socket.emit("message", { message: "welcome to Food-Tinder" });

  socket.on("create_room", (data) => {
    const {roomId, name} = data;
    console.log("create room" + roomId);
    socket.join(roomId);

    if (roomsMap.has(roomId)) {
      joinRoom(socket, roomId, name);
    } else {
      createRoom(roomId, socket, name);
    }

    //io.to(room).emit("message", {message: "this is a test"});
  });

  //set room location
  socket.on("set_location", (data) => {
    const { room, location, radius, offset } = data;
    console.log(socket.id + " sent location for room " + room);
    if (roomsMap.has(room)) {
      roomsMap.get(room).setLocation(location, radius, offset);
    }
    //io.to(room).emit("message", {message: "room location was set"});
  });

  //set room's filters
  socket.on("set_filters", (data) => {
    const { room, price, categories, ratings } = data;
    console.log("price");
    console.log(socket.id + " sent filters for room " + room);
    if (roomsMap.has(room)) {
      roomsMap.get(room).setFilters(price, categories, ratings);
    }
    //io.to(room).emit("message", {message: "room location was set"});
  });

  socket.on("join_room", (data) => {
    const {roomId, name} = data;
    joinRoom(socket, roomId, name);
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
      roomsMap.get(room).receivedRestaurantData(socket.id);
      console.log("client " + socket.id + " received restaurant data");
    }
  });

  //when a client sends a yes vote
  socket.on("yes_vote", (data) => {
    const { room, restaurantId } = data;
    if (roomsMap.has(room)) {
      if (roomsMap.get(room).addYesVote(restaurantId, socket.id)) {
        console.log("match found being emitted @ 141");
        io.to(room).emit("match_found", restaurantId);
      }
    }
  });

  //when a client sends a no vote
  socket.on("no_vote", (data) => {
    const { room, restaurantId } = data;
    if (roomsMap.has(room)) {
      roomsMap.get(room).addNoVote(restaurantId, socket.id);
    }
  });

  //start swiping event for everyone
  socket.on("start_event", (roomId) => {
    console.log("client " + socket.id + " started swiping event");
    if (roomsMap.has(roomId)) {
      socket.to(roomId).emit("start_event");
      roomsMap.get(roomId).started = true;
    }
  });

  //when a client wants to get a room id
  socket.on("create_room_and_get_id", (data) => {
    const {name} = data;
    hostID = socket.id;
    console.log("host is", hostID);

    var roomId = generateRoomId();
    while (roomsMap.has(roomId)) {
      roomId = generateRoomId();
    }
    createRoom(roomId, socket, name);
  });

  //when a client wants to check if a room exists
  socket.on("room_exists", (roomId) => {
    console.log(
      "client " + socket.id + " is checking if room " + roomId + " exists"
    );
    var doesExist = roomsMap.has(roomId);
    if (doesExist && roomsMap.get(roomId).started) {
      doesExist = false;
    }
    socket.emit("room_exists", { roomId: roomId, exists: doesExist });
  });

  socket.on("finished", (roomId) => {
    console.log("client " + socket.id + " is finished in " + roomId);
    if (roomsMap.has(roomId)) {
      roomsMap.get(roomId).memberFinished(socket.id);
    }
  });

  socket.on("disconnecting", () => {
    console.log("client " + socket.id + " is disconnecting");
    var rooms = socket.rooms;

    rooms.forEach((element) => {
      if (roomsMap.has(element)) {
        const room = roomsMap.get(element);
        if (room.size === 1) {
          roomsMap.delete(element);
        } else {
          room.memberLeft(socket.id);
        }
        console.log("client" + socket.id + " left room " + element);
        io.to(element).emit("room_size_changed", {newSize: room.size, memberNames: room.getMemberNames()});

        if (socket.id === hostID) {
          console.log("host is leaving");
          io.to(element).emit("host_left");
        }
      }
    });
  });
});

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

function generateRoomId() {
  var roomId = "" + Math.floor(Math.random() * 10000 + 1);
  while (roomId.length < 5) {
    roomId = "0" + roomId;
  }
  return roomId;
}

function joinRoom(socket, roomId, name) {
  console.log("client " + socket.id + " joined the room " + roomId);
  socket.join(roomId);

  var size = 0;
  let memberNames = [];
  if (roomsMap.has(roomId)) {
    const room = roomsMap.get(roomId);
    if (room.addMember(socket.id, name)) {
      var restaurants = room.getRestaurants();
      io.to(roomId).emit("get_restaurants", JSON.stringify(restaurants));
    }
    memberNames = room.getMemberNames();
    size = room.size;
  } else {
    roomsMap.set(roomId, new Room(1));
    size = 1;
  }

  io.to(roomId).emit("room_size_changed", {newSize: size, memberNames: memberNames});
}

function createRoom(roomId, socket, name) {
  var room = new Room(roomId, 0);
  roomsMap.set(roomId, room);
  room.addMember(socket.id, name);
  socket.join(roomId);
  socket.emit("room_id", {roomId: roomId, memberNames: room.getMemberNames()});
}