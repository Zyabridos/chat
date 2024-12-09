import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import routes from './routes.js'

const app = express();
const server = createServer(app); 
const io = new Server(server);

// тут будет нормальная БД, но пока так
let messages = [];

// коннектимся... 
io.on("connection", (socket) => {
  console.log("Есть контакт!");

  // получение сообщений с сервера
  socket.emit("messages", messages);

  socket.on("sendMessage", (message) => {
    messages.push(message);
    // показать сообщение всем юзерам
    io.emit("message", message);
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