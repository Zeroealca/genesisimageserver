import { Router } from "express";
import imageController from "../controllers/imageController";
import { upload_file, eliminarMetadatos } from "../utils/files";
const router = Router();

router.get("/getAll/:company", imageController.getAllImagesByCompany)
router.post("/upload", upload_file.array('files'), eliminarMetadatos, imageController.upload)
router.delete("/delete", imageController.delete)
router.delete("/deleteMany", imageController.deleteMany)

export default router;
