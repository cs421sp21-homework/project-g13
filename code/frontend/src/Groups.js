const express = require("express");
const app = express();
//const http = require("http");
//const server = http.createServer(app);
const cors = require("cors");
app.use(cors());
const socketio = require("socket.io");

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

io.on("connection", function (socket) {
  console.log("user joined the page");

  socket.emit("message", "welcome to Food-Tinder");

  socket.on("create_room", (room) => {
    socket.join(room);
    console.log("hello");
    socket.emit("message", "A user has joined the room!");
  });

  socket.on("join_room", (data) => {
    console.log("user joined the room");
    socket.join(data.room);
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
    socket.to(room).emit(message, {
      message,
    });
  });
});

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
