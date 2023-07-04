import companyService from "../services/company-service";
import { createFolder } from "../utils/folders";
import { join } from "path";

const companyController = {
  register: async (req, res) => {
    try {
      const { ruc } = req.body;
      const data = {
        ruc,
      };
      const companyE = await companyService.getCompanyByRUC(ruc);
      if (companyE.length) {
        res
          .status(404)
          .json({ status: false, msg: "Ya existe una empresa con ese nombre" });
        return;
      }
      const result = await companyService.createCompany(data);
      if (result.insertedId) {
        const folderPath = join(__dirname, '../../public', ruc);
        const response = createFolder(folderPath);
        return res
          .status(200)
          .json({ status: true, msg: "success", data, response });
      }
      throw new Error("Error al crear la empresa");
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: error.message });
    }
  },
  getCompany: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await companyService.getCompany(id);
      if (result) {
        return res
          .status(200)
          .json({ status: true, msg: "success", data: result });
      }
      throw new Error("Error al obtener la empresa");
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: error.message });
    }
  },
  getAllCompanies: async (req, res) => {
    try {
      const result = await companyService.getAllCompanies();
      if (result) {
        return res
          .status(200)
          .json({ status: true, msg: "success", data: result });
      }
      throw new Error("Error al obtener las empresas");
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: error.message });
    }
  },
  updateCompany: async (req, res) => {
    try {
      const { id } = req.params;
      const { ruc } = req.body;
      const result = await companyService.updateCompany(id, ruc);
      if (result) {
        return res
          .status(200)
          .json({ status: true, msg: "success", data: result });
      }
      throw new Error("Error al actualizar la empresa");
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: error.message });
    }
  },
};

export default companyController;
