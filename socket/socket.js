var CryptoJS = require("crypto-js");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const app = express();
const route = require("./route");
const Message = require("./schema");

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://anekantjainsagar:mB0qfYhGUYewkwrs@cluster0.f6bn9g4.mongodb.net"
  )
  .then((res) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Socket server
io.on("connection", (socket) => {
  // console.log(`Connected`);

  socket.on("join", ({ userId }) => {
    socket.join(userId);
  });

  socket.on("message", async ({ from, to, message }) => {
    try {
      // Encryption
      let temp = CryptoJS.AES.encrypt(message, "MINDMATES").toString();
      let newMessage = Message({
        sender: from,
        receiver: to,
        message: temp,
        time: new Date(Date.now()),
      });

      await newMessage.save();
      io.local.emit("message", newMessage);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    // console.log(`Disconnected`);
  });
});

app.use("/api", route);

server.listen(8000, () => {
  console.log(`Server running on port ${8000}`);
});
