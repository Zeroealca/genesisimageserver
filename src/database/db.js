// db.js
require("dotenv").config();
import { MongoClient } from "mongodb";

const uri = process.env.URI_CONNECTION || "mongodb://localhost:27017/"
  //"mongodb+srv://emilioan999:V1zo6nV2BRY5D7Yk@apivademecum.o9m6fgm.mongodb.net/?retryWrites=true&w=majority"; // Actualiza con la URI de tu base de datos
const client = new MongoClient(uri);

client.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

export default client; // Exporta el cliente de MongoDB
