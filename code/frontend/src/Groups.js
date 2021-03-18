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

io.on("connection", function (socket) {
  console.log("user joined the page");

  socket.emit("message", "welcome to Food-Tinder");

  socket.on("create_room", (room) => {
    socket.join(room);
    console.log("hello");
    socket.emit("message", "A user has joined the room!");
  });

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("user joined the room");
    console.log(room);
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
