import { Server as SocketIOServer, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { instrument } from "@socket.io/admin-ui";
import config from "../config";
import { getUserByIdService } from "../api/services/user/user.service";
import { getSingleFileService } from "../api/services/file/file.service";
import {
  createMessageService,
  getMessagesService,
  createIndividualMessageService,
  getIndividualMessagesService,
} from "../api/services/message/message.service";
import { customiseMessages } from "../utils/socketMessages";
import {
  createCommentService,
  getCommentsService,
  removeCommentService,
  updateCommentService,
} from "../api/services/file/comment.service";
import {
  createStashService,
  getStashesService,
  StashData,
  removeStashService,
  updateStashService,
} from "../api/services/file/stash.service";

import mongoose from "mongoose";
import { getFileVersionHistoryListService } from "../api/services/file/versionHistory.service";

interface Comment {
  id: string;
  message: string;
  userId: mongoose.Schema.Types.ObjectId;
  lastUpdatedAt: Date;
  replies: {
    id: string;
    message: string;
    userId: mongoose.Schema.Types.ObjectId;
    lastUpdatedAt: Date;
  }[];
}

// Extend the Socket interface to include a user property
interface CustomSocket extends Socket {
  user?: any;
}
const users = {}; // Store connected users {socketId: userId}

export const setupSocketIO = (httpServer: any) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  // Enable Socket.IO admin UI for debugging
  instrument(io, {
    auth: false,
    mode: "development",
  });

  // Middleware to authenticate sockets on connection
  io.use(async (socket: CustomSocket, next) => {
    try {
      if (!config.secretKeys.auth) {
        throw new Error("Authentication secret is not defined.");
      }
      console.log("New socket connection initiated.");

      const { token, fileId } = socket.handshake.auth;
      if (!token || !fileId) return next(new Error("Missing token or fileId"));
      // Validate JWT token
      let decoded;
      try {
        decoded = jwt.verify(token, config.secretKeys.auth);
      } catch (err) {
        return next(new Error("Invalid token"));
      }

      // Get the user by ID
      const { user } = await getUserByIdService({ userId: decoded.user });
      if (!user || !user.isVerified || !fileId)
        return next(new Error("Invalid user or file"));

      // Get the file associated with the user
      const { status } = await getSingleFileService({
        fileId,
        userId: user._id.toString(),
      });

      if (status !== 200) return next(new Error("Invalid file"));

      // Attach user to socket for later use
      socket.user = user;
      next();
    } catch (error) {
      console.error("Socket authentication error:", error);
      next(new Error("Authentication failed"));
    }
  });

  // Handle socket connection events
  io.on("connection", async (socket: CustomSocket) => {
    console.log("Client connected to Socket.IO");
    const user_id = socket.user._id;
    const roomId = socket.handshake.auth.fileId;
    socket.join(roomId); // Join the file-specific room
    // Fetch and emit initial messages to the client

    try {
      const { messages } = await getMessagesService({ roomId });
      const customisedMessages = customiseMessages(messages, socket);
      io.to(socket.id).emit("initialMessages", customisedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      socket.emit("error", "Failed to load messages");
    }

    // Fetch and emit initial comments and stashes to the client
    const versionName = socket.handshake.auth.versionDetails?.versionName;
    try {
      const versionHistory = await getFileVersionHistoryListService({
        fileId: roomId,
        versionName,
      });
      const { comments } = await getCommentsService(roomId, versionName);

      const { stashes } = await getStashesService(roomId, versionName);
      io.to(socket.id).emit("initialComments", comments);
      io.to(socket.id).emit("initialStashes", stashes);
      io.to(socket.id).emit("initialVersionHistory", versionHistory); //for fetching screenplay versions
    } catch (error) {
      console.error("Error fetching comments/stashes:", error);
      socket.emit("error", "Failed to load comments or stashes");
    }

    // Handle typing events
    socket.on("typing", () => socket.to(roomId).emit("typing"));
    socket.on("stoptyping", () => socket.to(roomId).emit("stoptyping"));

    // Handle message sending
    socket.on("sendMessage", async (messageObj) => {
      try {
        const { content } = messageObj;
        const date = new Date();
        await createMessageService({
          content,
          roomId,
          senderId: socket.user?._id,
        });

        socket.broadcast.to(roomId).emit("newMessage", {
          content,
          date,
          username: `${socket.user?.firstName} ${socket.user?.lastName}`,
          isCurrentUser: false,
        });
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", "Failed to send message");
      }
    });

    socket.on("addComment", async (data: Comment) => {
      try {
        // const newComments = await createCommentService(roomId, user_id, data)
        const newComments = await createCommentService(
          roomId,
          data,
          versionName
        );

        io.to(roomId).emit("commentsUpdated", newComments);
      } catch (error) {
        console.error("Error adding comment:", error);
        socket.emit("error", "Failed to add comment");
      }
    });

    socket.on("updateComment", async (updatedComment: any) => {
      try {
        const updatedComments = await updateCommentService(
          roomId,
          updatedComment,
          versionName
        );
        console.log("updatedComments", updatedComments);
        io.to(roomId).emit("commentsUpdated", updatedComments);
      } catch (error) {
        console.error("Error updating comment:", error);
        socket.emit("error", "Failed to update comment");
      }
    });

    socket.on("refreshSocket", async (versionName: any) => {
      try {
        const versionHistory = await getFileVersionHistoryListService({
          fileId: roomId,
          versionName,
        });
        const { comments } = await getCommentsService(roomId, versionName);

        const { stashes } = await getStashesService(roomId, versionName);
        io.to(socket.id).emit("initialComments", comments);
        io.to(socket.id).emit("initialStashes", stashes);
        io.to(socket.id).emit("initialVersionHistory", versionHistory); //for fetching screenplay versions
      } catch (error) {
        console.error("Error refresh:", error);
        socket.emit("error", "Failed to update comment");
      }
    });

    socket.on("removeComment", async (commentId: string) => {
      try {
        const updatedComments = await removeCommentService(
          roomId,
          commentId,
          versionName
        );
        io.to(roomId).emit("commentsUpdated", updatedComments);
      } catch (error) {
        console.error("Error removing comment:", error);
        socket.emit("error", "Failed to remove comment");
      }
    });

    socket.on("addStash", async (data: StashData) => {
      try {
        const newStashes = await createStashService(data, versionName);
        io.to(roomId).emit("stashesUpdated", newStashes);
      } catch (error) {
        console.error("Error adding stash:", error);
        socket.emit("error", "Failed to add stash");
      }
    });

    socket.on(
      "updateStash",
      async ({
        fileId,
        stashId,
        updatedMessage,
        updatedTitle,
      }: {
        fileId: string;
        stashId: string;
        updatedMessage?: string;
        updatedTitle?: string;
      }) => {
        try {
          const updatedStashes = await updateStashService(
            fileId,
            stashId,
            versionName,
            updatedMessage,
            updatedTitle
          );
          console.log("updatedStashes", updatedStashes);
          io.to(roomId).emit("stashesUpdated", updatedStashes);
        } catch (error) {
          console.error("Error updating stash:", error);
          socket.emit("error", "Failed to update stash");
        }
      }
    );
    socket.on("removeStash", async (fileId: string, stashId: string) => {
      try {
        const { updatedStash } = await removeStashService(
          fileId,
          stashId,
          versionName
        );
        io.to(roomId).emit("stashesUpdated", updatedStash);
      } catch (error) {
        console.error("Error removing stash:", error);
        socket.emit("error", "Failed to remove stash");
      }
    });
    ///updatedversionHistory
    socket.on("updatedVersionHistory", async () => {
      const versionHistory = await getFileVersionHistoryListService({
        fileId: roomId,
        versionName,
      });
      io.to(roomId).emit("initialVersionHistory", versionHistory);
    });
    //     // Save the userId when the user logs in
    socket.on("user-joined", (userId) => {
      console.log(`User joined: ${userId}, socket ID: ${socket.id}`);
      users[socket.id] = userId; // Map socket ID to user ID
    });

    socket.on(
      "sendMessage-toUser",
      async ({ toUserId, message, fromUserId }) => {
        try {
          await createIndividualMessageService({
            content: message,
            roomId,
            senderId: fromUserId,
            receiverId: toUserId,
          });

          const recipientSocketId = Object.keys(users).find(
            (key) => users[key] === toUserId
          );

          if (recipientSocketId) {
            const date = new Date();

            io.to(recipientSocketId).emit("receive-message", {
              content: message,
              fromUserId,
              date,
              username: `${socket.user?.firstName} ${socket.user?.lastName}`,
              isCurrentUser: false,
              createdAt: new Date(Date.now()).toISOString(), // Convert to ISO string
            });
          } else {
            console.log("Recipient not connected or invalid toUserId");
          }
          const { messages } = await getIndividualMessagesService({
            roomId,
            senderId: fromUserId,
            receiverId: toUserId,
          });
          io.to(socket.id).emit("initialIndividualMessages", messages);
        } catch (err) {
          console.error("Error sending message:", err);
          socket.emit("error", "Failed to send message");
        }
      }
    );

    //screenplay version history

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      delete users[socket.id]; //
    });
  });
};
// import { Server as SocketIOServer, Socket } from 'socket.io'
// import jwt from 'jsonwebtoken'
// import { instrument } from '@socket.io/admin-ui'
// import config from '../config'
// import { getUserByIdService } from '../api/services/user/user.service'
// import { getSingleFileService } from '../api/services/file/file.service'
// import {
//   createMessageService,
//   getMessagesService,
//   createIndividualMessageService,
//   getIndividualMessagesService
// } from '../api/services/message/message.service'
// import { customiseMessages } from '../utils/socketMessages'
// import {
//   createCommentService,
//   getCommentsService,
//   removeCommentService,
//   updateCommentService
// } from '../api/services/file/comment.service'
// import {
//   createStashService,
//   getStashesService,
//   stashData,
//   removeStashService,
//   updateStashService
// } from '../api/services/file/stash.service'
// import mongoose from 'mongoose'

// interface Comment {
//   id: string
//   message: string
//   userId: mongoose.Schema.Types.ObjectId
//   lastUpdatedAt: Date
//   replies: {
//     id: string
//     message: string
//     userId: mongoose.Schema.Types.ObjectId
//     lastUpdatedAt: Date
//   }[]
// }

// // Extend the Socket interface to include a user property
// interface CustomSocket extends Socket {
//   user?: any
// }
// const users = {} // Store connected users {socketId: userId}

// export const setupSocketIO = (httpServer: any) => {
//   const io = new SocketIOServer(httpServer, {
//     cors: {
//       origin: '*',
//       methods: ['GET', 'POST'],
//       credentials: true
//     },
//     transports: ['websocket', 'polling']
//   })

//   // Enable Socket.IO admin UI for debugging
//   instrument(io, {
//     auth: false,
//     mode: 'development'
//   })

//   // Middleware to authenticate sockets on connection
//   io.use(async (socket: CustomSocket, next) => {
//     try {
//       if (!config.secretKeys.auth) {
//         throw new Error('Authentication secret is not defined.')
//       }
//       console.log('New socket connection initiated.')

//       const { token, fileId } = socket.handshake.auth
//       if (!token || !fileId) return next(new Error('Missing token or fileId'))

//       // Validate JWT token
//       let decoded
//       try {
//         decoded = jwt.verify(token, config.secretKeys.auth)
//       } catch (err) {
//         return next(new Error('Invalid token'))
//       }

//       // Get the user by ID
//       const { user } = await getUserByIdService({ userId: decoded.user })
//       if (!user || !user.isVerified || !fileId)
//         return next(new Error('Invalid user or file'))

//       // Get the file associated with the user
//       const { status } = await getSingleFileService({
//         fileId,
//         userId: user._id.toString()
//       })

//       if (status !== 200) return next(new Error('Invalid file'))

//       // Attach user to socket for later use
//       socket.user = user
//       next()
//     } catch (error) {
//       console.error('Socket authentication error:', error)
//       next(new Error('Authentication failed'))
//     }
//   })

//   // Handle socket connection events
//   io.on('connection', async (socket: CustomSocket) => {
//     console.log('Client connected to Socket.IO')

//     const roomId = socket.handshake.auth.fileId
//     socket.join(roomId) // Join the file-specific room
//     // Fetch and emit initial messages to the client

//     try {
//       const { messages } = await getMessagesService({ roomId })
//       const customisedMessages = customiseMessages(messages, socket)
//       io.to(socket.id).emit('initialMessages', customisedMessages)
//     } catch (error) {
//       console.error('Error fetching messages:', error)
//       socket.emit('error', 'Failed to load messages')
//     }

//     // Fetch and emit initial comments and stashes to the client
//     try {
//       const { comments } = await getCommentsService(roomId)
//       const { stashes } = await getStashesService(roomId)

//       io.to(socket.id).emit('initialComments', comments)
//       io.to(socket.id).emit('initialStashes', stashes)
//     } catch (error) {
//       console.error('Error fetching comments/stashes:', error)
//       socket.emit('error', 'Failed to load comments or stashes')
//     }

//     // Handle typing events
//     socket.on('typing', () => socket.to(roomId).emit('typing'))
//     socket.on('stoptyping', () => socket.to(roomId).emit('stoptyping'))

//     // Handle message sending
//     socket.on('sendMessage', async messageObj => {
//       try {
//         const { content } = messageObj
//         const date = new Date()
//         await createMessageService({
//           content,
//           roomId,
//           senderId: socket.user?._id
//         })

//         socket.broadcast.to(roomId).emit('newMessage', {
//           content,
//           date,
//           username: `${socket.user?.firstName} ${socket.user?.lastName}`,
//           isCurrentUser: false
//         })
//       } catch (error) {
//         console.error('Error sending message:', error)
//         socket.emit('error', 'Failed to send message')
//       }
//     })

//     socket.on('addComment', async (data: Comment) => {
//       try {
//         const newComments = await createCommentService(roomId, data)
//         io.to(roomId).emit('commentsUpdated', newComments)
//       } catch (error) {
//         console.error('Error adding comment:', error)
//         socket.emit('error', 'Failed to add comment')
//       }
//     })

//     socket.on('updateComment', async (updatedComment: any) => {
//       try {
//         const updatedComments = await updateCommentService(
//           roomId,
//           updatedComment
//         )
//         io.to(roomId).emit('commentsUpdated', updatedComments)
//       } catch (error) {
//         console.error('Error updating comment:', error)
//         socket.emit('error', 'Failed to update comment')
//       }
//     })

//     socket.on('removeComment', async (commentId: string) => {
//       try {
//         const updatedComments = await removeCommentService(roomId, commentId)
//         io.to(roomId).emit('commentsUpdated', updatedComments)
//       } catch (error) {
//         console.error('Error removing comment:', error)
//         socket.emit('error', 'Failed to remove comment')
//       }
//     })

//     socket.on('addStash', async (data: stashData) => {
//       try {
//         const newStashes = await createStashService(data)
//         io.to(roomId).emit('stashesUpdated', newStashes)
//       } catch (error) {
//         console.error('Error adding stash:', error)
//         socket.emit('error', 'Failed to add stash')
//       }
//     })

//     socket.on(
//       'updateStash',
//       async ({
//         fileId,
//         stashId,
//         updatedMessage,
//         updatedTitle
//       }: {
//         fileId: string
//         stashId: string
//         updatedMessage?: string
//         updatedTitle?: string
//       }) => {
//         try {
//           const updatedStashes = await updateStashService(
//             fileId,
//             stashId,
//             updatedMessage,
//             updatedTitle
//           )
//           io.to(roomId).emit('stashesUpdated', updatedStashes)
//         } catch (error) {
//           console.error('Error updating stash:', error)
//           socket.emit('error', 'Failed to update stash')
//         }
//       }
//     )
//     socket.on('removeStash', async (fileId: string, stashId: string) => {
//       try {
//         const { updatedStash } = await removeStashService(fileId, stashId)
//         io.to(roomId).emit('stashesUpdated', updatedStash)
//       } catch (error) {
//         console.error('Error removing stash:', error)
//         socket.emit('error', 'Failed to remove stash')
//       }
//     })

//     // Save the userId when the user logs in
//     socket.on('user-joined', userId => {
//       console.log(`User joined: ${userId}, socket ID: ${socket.id}`)
//       users[socket.id] = userId // Map socket ID to user ID
//     })

//     socket.on(
//       'sendMessage-toUser',
//       async ({ toUserId, message, fromUserId }) => {
//         try {
//           await createIndividualMessageService({
//             content: message,
//             roomId,
//             senderId: fromUserId,
//             receiverId: toUserId
//           })

//           const recipientSocketId = Object.keys(users).find(
//             key => users[key] === toUserId
//           )

//           if (recipientSocketId) {
//             const date = new Date()

//             io.to(recipientSocketId).emit('receive-message', {
//               content: message,
//               fromUserId,
//               date,
//               username: `${socket.user?.firstName} ${socket.user?.lastName}`,
//               isCurrentUser: false,
//               createdAt: new Date(Date.now()).toISOString() // Convert to ISO string
//             })
//           } else {
//             console.log('Recipient not connected or invalid toUserId')
//           }
//           const { messages } = await getIndividualMessagesService({
//             roomId,
//             senderId: fromUserId,
//             receiverId: toUserId
//           })
//           io.to(socket.id).emit('initialIndividualMessages', messages)
//         } catch (err) {
//           console.error('Error sending message:', err)
//           socket.emit('error', 'Failed to send message')
//         }
//       }
//     )
//     socket.on('disconnect', () => {
//       console.log(`User disconnected: ${socket.id}`)
//       delete users[socket.id] //
//     })
//   })
// }
