import { Router } from "express";
import companyController from "../controllers/companyController";
import imageController from "../controllers/imageController";
import { upload_file, eliminarMetadatos } from "../utils/files";
const router = Router();

// Rutas con sus middlewares
// Trae todas las imágenes de una empresa con su public url
router.get("/getAll/:company", imageController.getAllImagesByCompany)
// Sube la imágen por empresa y referencia (nombre de la carpeta)
router.post("/upload", eliminarMetadatos, imageController.upload)
// Elimina una sola imagen tanto de la carpeta como de la bd
router.delete("/delete/:imageId", imageController.delete)
// Elimina varias imágenes (recibe un array de ids en la query images)
router.delete("/deleteMany/:images", imageController.deleteMany)

router.get("/truncate", imageController.truncate)

export default router;
