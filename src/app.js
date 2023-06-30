import express from "express";
// import { json } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import imageRoutes from "./routes/image";
import companyRoutes from "./routes/company";
// import medicineRoutes from "./routes/medicine";
const app = express();

app.use(express.json());

const whiteList = ["http://localhost:3000", "http://192.168.11.221:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback(`Error de CORS origin: ${origin} No autorizado`);
    },
    credentials: true,
  })
);
app.options("*", cors()); // Configura el middleware cors para las solicitudes OPTIONS

app.use(
  morgan(
    ":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"
  )
);
app.use("/company", companyRoutes);
app.use("/image", imageRoutes);
// app.use("/medicine", medicineRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Establecer la clave interna
const clave_interna = "leonardo";
export default app;
