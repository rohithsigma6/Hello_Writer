import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import config from "../config";

interface User {
  _id: string;
}

interface Message {
  content: string;
  roomId: string;
  sender: User;
}

const initiateVideoSocket = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: {
      origin: config.url.frontendBaseUrl,
    },
  });

  io.use((socket, next) => {
    // if (isValid(socket.request)) {
    //   next();
    // } else {
    //   next(new Error("invalid"));
    // }
    console.log({ socket: socket.request });
    next();
  });

  io.on("connection", (socket: Socket) => {
    console.log("connection to socket.io");

    // Creating a room with that particular user
    socket.on("setup", (userData: User) => {
      console.log(userData._id);
      socket.join(userData._id);
      socket.emit("user connected");
    });

    socket.on("join room", (roomID: string) => {
      socket.join(roomID);
      console.log("User joined room:" + roomID);
    });

    socket.on("typing", (roomID: string) => socket.in(roomID).emit("typing"));
    socket.on("stoptyping", (roomID: string) => socket.in(roomID).emit("stoptyping"));

    socket.on("new message", (messageObj: Message) => {
      const { content, roomId, sender } = messageObj;

      if (!sender) return console.log("sender not defined");

      // Broadcasting the new message to the room
      socket.broadcast.to(roomId).emit("new message", messageObj);
    });

    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
    });
  });
};

export default initiateVideoSocket;