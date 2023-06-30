// app.js o index.js
import express from "express";
import { createServer } from "http";
import app from "./app";
require("dotenv").config();

const port = process.env.PORT || 4000;

// Inicia el servidor
const server = createServer(app);

server.listen(port, async () => {
  try {
    console.log(`Servidor escuchando en el puerto ${port}`);
  } catch (error) {
    console.log(error);
  }
});
