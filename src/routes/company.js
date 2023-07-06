import { Router } from "express";
import companyController from "../controllers/companyController";
// import { verifyToken, requireSuperAdmin } from "../controllers/authController";
const router = Router();

//ruta de creacion de empresa
router.post("/create", companyController.register);
//Ruta de actualización de empresa
router.put("/update/:oldruc", companyController.updateCompany);

// Ruta para obtener una empresa
router.get(
  "/get/:id",
  companyController.getCompany
);

// Ruta para obtener todas las empresa
router.get(
  "/getAll",
  companyController.getAllCompanies
);

router.get("/truncate", companyController.truncate);

export default router;
