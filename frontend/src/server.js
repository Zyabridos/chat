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
// тут будет нормальная БД, но пока так
let messages = [];

const checkToken = (token) => {
  return 'valid token'
}
// коннектимся... 
io.on("connection", (socket) => {
  console.log("Есть контакт!");

  // получение сообщений с сервера
  socket.emit("messages", messages);

  socket.on("getMessages", (token) => {
    if (checkToken(token)) {
      // показать сообщение всем юзерам c сервера
      socket.emit("messages", messages);
    } else {
      socket.emit("error", "Invalid token");
    }
  });

  socket.on("sendMessage", (data) => {
    const { message, token } = data;
    if (checkToken(token)) {
      messages.push(message);
      // показать сообщение всем юхерам чата
      io.emit("messageSent", message);
    } else {
      socket.emit("error", "Invalid token");
    }
  });

  // Расконнектились
  socket.on("disconnect", () => {
    console.log("юзер вышел");
  });
});

app.get(routes.messagesPath(), (req, response) => {
  console.log(json.stringify(response))
  response.json(messages);
});

const PORT = 5002;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// dont forget TO START SERVER =D
//  node ./src/server.js