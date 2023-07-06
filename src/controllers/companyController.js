import companyService from "../services/company-service";
import imageService from "../services/image-service";
import { createFolder, renameFolder } from "../utils/folders";
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
          .json({ status: false, msg: "Ya existe una empresa con ese ruc" });
        return;
      }
      const result = await companyService.createCompany(data);
      if (result.insertedId) {
        const folderPath = join(__dirname, '../../public', ruc);
        createFolder(folderPath);
        return res
          .status(200)
          .json({ status: true, msg: "success"});
      }
      throw new Error("Error al crear la empresa");
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: error.message });
    }
  },
  exist: async (req, res, next) => {
    try {
      const { ruc } = req.body;
      const companyE = await companyService.getCompanyByRUC(ruc);
      if (!companyE.length) {
        res
          .status(404)
          .json({ status: false, msg: "No existe una empresa con ese ruc" });
        return;
      }
      next();
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
      const { oldruc } = req.params;
      const { ruc } = req.body;
      const exist = await companyService.getCompanyByRUC(oldruc);
      
      if(!exist.length){
        throw new Error(`No existe una empresa con el ruc: ${oldruc}`);
      }
      const newexist = await companyService.getCompanyByRUC(ruc)
      if(newexist.length){
        throw new Error(`Ya existe una empresa con el ruc: ${ruc}`)
      }
      const result = await companyService.updateCompany(oldruc, ruc);
      if (result.modifiedCount) {
        await imageService.updateImage(oldruc,ruc);
      renameFolder(oldruc,ruc)
        return res
          .status(200)
          .json({ status: true, msg: "success" });
      }
      throw new Error("Error al actualizar la empresa");
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: error.message });
    }
  },
  truncate: async (req, res) => {
    try {
      const result = await companyService.truncate();
      if (result) {
        return res
          .status(200)
          .json({ status: true, msg: "success", data: result });
      }
      throw new Error("Error al truncar la tabla");
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: error.message });
    }
  }
};

export default companyController;
