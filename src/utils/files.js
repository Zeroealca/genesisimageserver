import { unlinkSync } from 'fs';
import multer, {diskStorage} from 'multer';
import sharp from 'sharp';
import { join } from 'path';
import { createFolder } from './folders';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname.replace(/\s/g, "").replace(/[()]/g, ""));
  },
});

export const upload_file = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file?.mimetype == "image/png" ||
      file?.mimetype ==
        "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb("Error: Solo archivos Excel o CSV");
    }
  },
});

export const eliminarMetadatos = (req, res, next) => {
  if (!req.files) {
    return next();
  }
  const { ruc, reference, product } = req.body;

  const promises = req.files.map((file) => {
    const imagePath = join(__dirname, '../../', file.path); // Ruta de la imagen subida
    if(reference){
      const parentPath = join(__dirname, '../../public', `${ruc}/${reference ?? ''}`); // Ruta de la carpeta padre de la referencia
      createFolder(parentPath);
      const folderPath = join(__dirname, '../../public', `${ruc}/${reference ?? ''}/${product}`); // Ruta de la carpeta padre de salida
      createFolder(folderPath);
    }
    const outputPath = join(__dirname, '../../public', `${ruc}/${reference ?? ''}/${product}/${file.filename}`); // Ruta de salida deseada
    return sharp(imagePath)
      .jpeg({ quality: 80 })
      .withMetadata(false)
      .toFile(outputPath)
      .then(() => {
        file.path = outputPath; // Actualiza la ruta del archivo en req.file
        console.log('Imagen sin metadatos guardada en:', outputPath);
        unlinkSync(imagePath); // Elimina la imagen original
      })
      .catch((error) => {
        console.error(error);
      });
  });

  Promise.all(promises)
    .then(() => {
      next();
    })
    .catch((error) => {
      console.error(error);
      next();
    });
};

