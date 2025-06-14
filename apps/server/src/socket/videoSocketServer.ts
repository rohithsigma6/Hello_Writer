import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import jwt from "jsonwebtoken";
import { getUserByIdService } from "../api/services/user/user.service";
import config from "../config";
import { getSingleFileService } from "../api/services/file/file.service";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: config.url.frontendBaseUrl,
  },
  path: "/conference/",
});

instrument(io, {
  auth: false,
  mode: "development",
});

interface CustomSocket extends Socket {
  user?: any;
}

interface Room {
  socketId: string;
  user: any;
}

const rooms: { [key: string]: Room[] } = {};

export const startVideoSocket = () => {
  io.use(async (socket: CustomSocket, next) => {
    const { token, fileId } = socket.handshake.auth;

    try {
      if (!config.secretKeys.auth) {
        throw new Error("Authentication secret is not defined.");
      }
      const decoded = jwt.verify(token, config.secretKeys.auth) as {
        user: string;
      };
      if (!decoded) {
        return next(new Error("invalid"));
      }

      const { user } = await getUserByIdService({ userId: decoded.user });

      if (!user) {
        return next(new Error("invalid"));
      }

      if (!user.isVerified) {
        return next(new Error("invalid"));
      }

      if (!fileId) {
        return next(new Error("invalid"));
      }

      const { file, status } = await getSingleFileService({
        fileId,
        userId: user?._id.toString(),
      });

      if (status !== 200) {
        return next(new Error("invalid"));
      }

      socket.user = user;
      next();
    } catch (error) {
      return next(new Error("invalid"));
    }
  });

  io.on("connection", async (socket: CustomSocket) => {
    console.log("connection to conference socket.io");
    const roomId = socket.handshake.auth.fileId;

    // Signalling events for WEBRTC
    socket.on("join room", () => {
      socket.join(roomId);

      if (!rooms[roomId]) rooms[roomId] = [];
      rooms[roomId].push({
        socketId: socket.id,
        user: socket.user,
      });

      const usersInRoom = rooms[roomId].filter(
        (user) => user.user._id !== socket.user._id
      );

      io.to(socket.id).emit("all users", usersInRoom);
    });

    socket.on("sending signal", ({ userToSignal, signal, callerId }) => {
      io.to(userToSignal).emit("user joined", { signal, callerId });
    });

    socket.on("returning signal", ({ callerId, signal }) => {
      io.to(callerId).emit("recieving returned signal", {
        signal,
        callerId: socket.id,
      });
    });

    socket.on("userExited", (userId) => {
      const user = rooms[roomId]?.find((obj) => obj.user._id === userId);

      if (rooms[roomId])
        rooms[roomId] = rooms[roomId].filter(
          (user) => user.user._id !== socket.user._id
        );
      socket.broadcast
        .to(roomId)
        .emit("userLeft", { peerId: user?.socketId, userId: socket.user._id });
      socket.leave(roomId);
    });

    socket.on("disconnect", () => {
      if (rooms[roomId])
        rooms[roomId] = rooms[roomId].filter(
          (user) => user.user._id !== socket.user._id
        );
    });
  });
};

httpServer.listen(config.videoPort, () => {
  console.log(`Video server connected at port ${config.videoPort}`);
});
