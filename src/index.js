import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/users.js";
import { messagesRouter } from "./routes/messages.js";

const app = express();

const allowedOrigins = ["https://anota-fron-end.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use((err, req, res, next) => {
  if (err.name === "CorsError") {
    console.error("Erro de CORS:", err.message);
    res.status(500).json({ message: "Erro de configuração CORS." });
  } else {
    next(err);
  }
});

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Bem vindo à aplicação" });
});

app.use("/users", usersRouter);
app.use("/messages", messagesRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});