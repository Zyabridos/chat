import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import routes from "./routes.js";

const app = express();
const server = createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow your frontend to connect
    methods: ["GET", "POST"],
  },
});

// Dummy message storage
let messages = [];

// Middleware to check the token (for simplicity, this is just an example)
const checkToken = (token) => {
  // Simulating token validation logic
  return token === "valid-token";
};

io.on("connection", (socket) => {
  console.log("User connected");

  // Event to fetch messages
  socket.on("getMessages", (token) => {
    if (checkToken(token)) {
      // Send messages to the client if the token is valid
      socket.emit("messages", messages);
    } else {
      socket.emit("error", "Invalid token");
    }
  });

  // Event to send a new message
  socket.on("sendMessage", (data) => {
    const { message, token } = data;
    if (checkToken(token)) {
      // Store message in memory (could be a database in a real app)
      messages.push(message);
      
      // Broadcast the message to all connected clients
      io.emit("messageSent", message);
    } else {
      socket.emit("error", "Invalid token");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
const PORT = 5002;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// dont forget TO START SERVER =D
//  node ./src/server.js