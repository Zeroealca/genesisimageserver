import companyService from "../services/company-service";
import imageService from "../services/image-service";
import { unlink } from "fs";

const imageController = {
  upload: async (req, res) => {
    try{
      const {files} = req;
      const {ruc, reference} = req.body;
      const companyE = await companyService.getCompanyByRUC(ruc);
      if (!companyE.length) {
        if(files.length){
          for (const file of files){
            unlink(file.path, (err) => {
              if (err) {
                console.error(err)
                return
              }
            })
          }
        }
        res
          .status(404)
          .json({ status: false, msg: "No existe una empresa con ese nombre" });
        return;
      }
      for (const file of files){
        const {filename} = file;
        const data = {
          name: filename,
          company: ruc,
          reference: reference,
        }
        const result = await imageService.createImage(data);
        if (!result.insertedId) {
          throw new Error("Error al crear la imagen");
        }
      }
      return res
        .status(200)
        .json({ status: true, msg: "success", data: files });
    } catch (error) {
      if(req.files.length){
        for (const file of req.files){
          unlink(file.path, (err) => {
            if (err) {
              console.error(err)
              return
            }
          })
        }
      }
      console.log(error);
      res.status(500).json({ status: false, msg: error.message });
    }
  }
};

export default imageController;
