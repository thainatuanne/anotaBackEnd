import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/users.js";
import { messagesRouter } from "./routes/messages.js";

const app = express();

app.use(
  cors({
    origin: "https://anota-fron-end.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    exposedHeaders: ["Content-Length", "X-Kuma-Revision"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bem vindo à aplicação",
  });
});

app.use("/users", usersRouter);
app.use("/messages", messagesRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});