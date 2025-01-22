import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/users.js";
import { messagesRouter } from "./routes/messages.js";

const app = express();

const allowedOrigins = ["https://anota-fron-end.vercel.app/"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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