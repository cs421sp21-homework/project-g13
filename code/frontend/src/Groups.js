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
  console.log("user joined a room");

  socket.on("create_room", (room) => {
    socket.join(room);
    console.log(room);
  });

  socket.on("join_room", (room) => {
    socket.join(room);
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
/*
const path = require("path");

const fs = require("fs");

app.use(express.static(path.join(__dirname, "public")));
fs.readFile("index.html", function (err, html) {
  if (err) throw err;

  http
    .createServer(function (request, response) {
      response.writeHeader(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    })
    .listen(PORT);
});

io.listen(PORT);
console.log("listening on port ", PORT);
*/
