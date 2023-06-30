import { Router } from "express";
import companyController from "../controllers/companyController";
// import { verifyToken, requireSuperAdmin } from "../controllers/authController";
const router = Router();

//ruta de creacion de cuenta
router.post("/create", companyController.register);
router.put("/update/:id", companyController.updateCompany);

router.get(
  "/get/:id",
  companyController.getCompany
);

router.get(
  "/getAll",
  companyController.getAllCompanies
);

export default router;
