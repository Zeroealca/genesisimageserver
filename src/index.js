// app.js o index.js
require("dotenv").config();
import { createServer } from "http";
import app from "./app";

const port = process.env.PORT || 2638;

// Inicia el servidor
const server = createServer(app);

server.listen(port, async () => {
  try {
    console.log(`Servidor escuchando en el puerto ${port}`);
  } catch (error) {
    console.log(error);
  }
});
