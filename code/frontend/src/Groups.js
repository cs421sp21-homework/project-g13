const http = require("http");
const socketIo = require("socket.io");

const port = 3000;

const index = require("./index");
const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

app.get("/", function (req, res) {
  res.render("index.html", null);
});

io.on("connection", function (socket) {
  console.log("user joined a room");

  socket.on("create_room", (room) => {
    socket.join(room);
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

io.listen(port);
console.log("listening on port ", port);
