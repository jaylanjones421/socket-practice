const express = require("express");
const app = express();
const socket = require("socket.io");
const port = 3002;

server = app.listen(port, console.log(`heyyyyy from port ${port}`));
const io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);
  socket.on("SEND_MESSAGE", data => {
    io.emit("RECEIVE_MESSAGE", data);
  });
});
