import express from "express";
import { v4 as uuidv4 } from "uuid";
import { users } from "./users.js";

export const messagesRouter = express.Router();
let messages = [];

messagesRouter.post("/", (req, res) => {
  const { email, title, description } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ 
      message: "Usuário não encontrado." 
    });
  }

  const newMessage = {
    id: uuidv4(),
    title,
    description,
    userId: user.id,
  };
  messages.push(newMessage);

  console.log("Nova mensagem criada:", newMessage);
  console.log("Estado atual das mensagens:", messages);

  return res.status(201).json({
    message: "Mensagem criada com sucesso!",
    data: newMessage,
  });
});

//
messagesRouter.get("/:email", (req, res) => {
  const { email } = req.params;
  const { page = 1, limit = 5 } = req.query;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado.",
    });
  }

  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 5;

  const userMessages = messages.filter((m) => m.userId === user.id);
  const totalItems = userMessages.length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedMessages = userMessages.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  res.status(200).json({
    messages: paginatedMessages,
    totalPages,
    currentPage,
    totalItems,
  });
});
  
  //const user = users.find((u) => u.email === email);

 // if (!user) {
   // return res.status(404).json({ 
   //   message: "Usuário não encontrado." });
  //}

  //const userMessages = messages.filter((m) => m.userId === user.id);
  //return res.status(200).json({ data: userMessages 

 // });
//});

messagesRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const message = messages.find((m) => m.id === id);
  if (!message) {
    return res.status(404).json({ 
      message: "Mensagem não encontrada." 
    });
  }

  if (title) message.title = title;
  if (description) message.description = description;

  return res.status(200).json({
    message: "Mensagem atualizada com sucesso!",
    data: message,
  });
});

//

messagesRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const messageIndex = messages.findIndex((m) => m.id === id);

  if (messageIndex === -1) {
    return res.status(404).json({ 
      message: "Mensagem não encontrada." 
    });
  }

  messages.splice(messageIndex, 1);
  return res.status(200).json({ 
    message: "Mensagem apagada com sucesso." 
  });
});

//

messagesRouter.get("/details/:id", (req, res) => {
  const { id } = req.params;

  const message = messages.find((m) => m.id === id);
  if (!message) {
    return res.status(404).json({ 
      message: "Recado não encontrado." 
    });
  }

  res.status(200).json({ 
    data: message 
  });
});

export default messagesRouter