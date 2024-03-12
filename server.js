import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const server = createServer(app);
const io = new Server(server);
const allUsers = {};

//file:://system/path/file.html
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("GET Request /");
  res.sendFile(join(__dirname + "/client/index.html"));
});

//handle io connections - event based
io.on("connection", (socket) => {
  console.log(`Socket id is ${socket.id}`);
  socket.on("join-user", (username) => {
    console.log(`${username} joined`);
    allUsers[username] = { username, id: socket.id };
    io.emit("joined", allUsers);
  });
});

server.listen(9000, () => {
  console.log("Server listening");
});
