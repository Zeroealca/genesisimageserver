import { Router } from "express";
import imageController from "../controllers/imageController";
import { upload_file, eliminarMetadatos } from "../utils/files";
const router = Router();

router.post("/upload", upload_file.array('files'), eliminarMetadatos, imageController.upload)

export default router;
