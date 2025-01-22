import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const usersRouter = express.Router();
export let users = [];

const isEmailRegistered = (email) => users.some((user) => user.email === email);

usersRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Por favor, preencha todos os campos.",
    });
  }

  if (isEmailRegistered(email)) {
    return res.status(400).json({
      message: "Email já cadastrado.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: uuidv4(), name, email, password: hashedPassword };
    users.push(newUser);

    return res.status(201).json({
      message: `Seja bem-vindo ${name}! Pessoa usuária criada com sucesso.`,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao registrar o usuário" });
  }
});

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Por favor, preencha todos os campos." });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "Email não encontrado." });
  }

  try {
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    return res.status(200).json({
      message: `Bem-vindo ${user.name}!`,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao processar o login" });
  }
});