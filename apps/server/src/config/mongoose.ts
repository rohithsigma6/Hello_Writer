import mongoose from "mongoose";

// When the db is connected
mongoose.connection.on("connected", () => {
  console.log("> Database online");
});

// If the connection throws an error
mongoose.connection.on("error", (err: Error) => {
  console.log("> Database Offline error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("> Database disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("> Database disconnected through app termination");
  process.exit(0);
});

export default mongoose;