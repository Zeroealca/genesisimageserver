require("dotenv").config();
import companyService from "../services/company-service";
import imageService from "../services/image-service";
import { unlink } from "fs";
import {join } from 'path'

const public_IP = process.env.PUBLIC_URL || "http://194.140.198.23";
const port = process.env.PORT || "2638"

const imageController = {
  getAllImagesByCompany: async (req, res) => {
    try {
      const { company } = req.params;
      const result = await imageService.getAllImagesByCompany(company);
      const referenciaImagenes = result.reduce((obj, image) => {
        const referencia = image.reference;
      
        // Verifica si la referencia ya existe como clave en el objeto
        if (obj.hasOwnProperty(referencia)) {
          // Si la referencia ya existe, agrega el nombre de la imagen al array correspondiente
          obj[referencia].push({url:join(`${public_IP}:${port}`,image.path.split('public')[1]).replaceAll('\\', '/'), name: image.name, id: image._id});
        } else {
          // Si la referencia no existe, crea un nuevo array con el nombre de la imagen
          obj[referencia] = [{url:join(`${public_IP}:${port}`,image.path.split('public')[1]).replaceAll('\\', '/'), name: image.name, id: image._id}];
        }
      
        return obj;
      }, {});
      res.status(200).json({ status: true, msg: "success", data: referenciaImagenes });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: error.message });
    }
  },
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
      const resultUpload = []
      for (const file of files){
        const {filename} = file;
        const data = {
          name: filename,
          company: ruc,
          reference: reference,
          path: file.path,
        }
        const result = await imageService.createImage(data);
        if (!result.insertedId) {
          throw new Error("Error al crear la imagen");
        }
        resultUpload.push({url:join(`${public_IP}:${port}`,file.path.split('public')[1]).replaceAll('\\', '/'), name: filename, id: result.insertedId});
      }
      return res
        .status(200)
        .json({ status: true, msg: "success", data: resultUpload });
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
  },
  delete: async (req, res) => {
    try {
      const { imageId, ruc, ref } = req.query;
      const result = await imageService.deleteImage(imageId);
      if (!result.deletedCount) {
        throw new Error("Error al eliminar la imagen");
      }
      const imagePath = `./src/${ruc}/${ref ?? ''}/${imageId}`;
      unlink(imagePath, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      res.status(200).json({ status: true, msg: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: error.message });
    }
  },
  deleteMany: async (req,res)=>{
    try {
      const {images} = req.query;
      const result = await imageService.getManyByIds(JSON.parse(images));
      console.log(result)
      if (!result.length) {
        throw new Error("No se encontraron imagenes");
      }
      for (const image of result){
        unlink(image.path, (err) => {
          if (err) {
            console.error(err)
            return
          }
        })
      }
      res.status(200).json({ status: true, msg: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: error.message });
    }
  }
};

export default imageController;
