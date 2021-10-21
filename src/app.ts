import "dotenv/config";
import express from "express";
import { router } from "./routes";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log(`Usuario conectado no socket ${socket.id}`);
});

app.use(express.json());
app.use(router);

app.get("/github", (request, resonse) => {
  resonse.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_SECRET_ID}`
  );
});

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { serverHttp, io };