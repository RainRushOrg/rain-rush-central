import dotenv from "dotenv";
import express from "express";
import { WebSocket } from "ws";
import http from "http";
import { sequelizeConnection } from "./connections/sequelize";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json()); // for parsing application/json

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes); // Assuming you have auth routes in userRoutes

sequelizeConnection.init(); // r/connections/sequelize.ts 

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send("Welcome to rainrush central, your performance will be recorded")
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
