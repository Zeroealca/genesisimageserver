import { unlinkSync } from 'fs';
import multer, {diskStorage} from 'multer';
import sharp from 'sharp';
import { join } from 'path';
import { createFolder } from './folders';

// Configuración de ruta donde se guardan las imágenes al llegar al servidor
const storage = diskStorage({
  // Ubicación
  destination: (req, file, cb) => {
    cb(null, "./src");
  },
  // Nombre
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname.replace(/\s/g, "").replace(/[()]/g, ""));
  },
});

// Método para subir las imágenes
export const upload_file = multer({
  storage,
  // Filtro de tipo de datos
  fileFilter: (req, file, cb) => {
    if (
      file?.mimetype == "image/png" ||
      file?.mimetype ==
        "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb("Error: Solo archivos JPEG, JPG, PNG");
    }
  },
});

// Procesamiento de las imágenes
export const eliminarMetadatos = async (req, res, next) => {
  const { ruc, reference, code, files } = req.body;
  if (!files) {
    console.log(files);
    return res.status(500).json({ msg: "Debe enviar al menos un archivo" });
  }

  const promises = files.map(async (file) => {
    const imageBuffer = Buffer.from(file.image.split(",")[1], "base64");
    const mimeType = file.image.match(/^data:(.*);base64,/)[1];
    if (reference) {
      const rootPath = join(__dirname, "../../public", `${ruc}`);
      createFolder(rootPath);
      const parentPath = join(
        __dirname,
        "../../public",
        `${ruc}/${reference ?? ""}`
      );
      createFolder(parentPath);
      const folderPath = join(
        __dirname,
        "../../public",
        `${ruc}/${reference ?? ""}/${code ?? ""}`
      );
      createFolder(folderPath);
    }
    const fileName = `${file.name}.${mimeType.split("/")[1]}`;
    const outputPath = join(
      __dirname,
      "../../public",
      `${ruc}/${reference ?? ""}/${code ?? ""}/${fileName}`
    );

    return new Promise((resolve, reject) => {
      sharp(imageBuffer)
        .jpeg({ quality: 80 })
        .withMetadata(false)
        .toFile(outputPath, (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (req.files) {
              req.files.push({ path: outputPath, name: fileName });
            } else {
              req.files = [{ path: outputPath, name: fileName }];
            }
            console.log("Imagen sin metadatos guardada en:", outputPath);
            resolve();
          }
        });
    });
  });

  try {
    await Promise.all(promises);
    next();
  } catch (error) {
    console.error(error);
    // Solo enviamos una respuesta si no se ha enviado una respuesta anteriormente
    if (!res.headersSent) {
      return res.status(500).json({ msg: error.message });
    }
  }
};


/* export const eliminarMetadatos = (req, res, next) => {
  // Si no llegan archivos, continua al controlador
  if (!req.files) {
    return next();
  }
  const { ruc, reference, code } = req.body;

  // El procesamiento de imágenes genera una promesa 
  const promises = req.files.map((file) => {
    const imagePath = join(__dirname, '../../', file.path); // Ruta de la imagen subida
    //Si existe referencia, crea una carpeta con ese nombre
    if(reference){
      const parentPath = join(__dirname, '../../public', `${ruc}/${reference ?? ''}`); // Ruta de la carpeta padre de la referencia
      createFolder(parentPath);
      const folderPath = join(__dirname, '../../public', `${ruc}/${reference ?? ''}/${code ?? ''}`); // Ruta de la carpeta padre de salida
      createFolder(folderPath);
    }
    
    const outputPath = join(__dirname, '../../public', `${ruc}/${reference ?? ''}/${code ?? ''}/${file.filename}`); // Ruta de salida deseada
    return sharp(imagePath)
      .jpeg({ quality: 80 }) // Se usa el 80% de la calidad de la imagen
      .withMetadata(false) // Se borran los metadatos
      .toFile(outputPath) // Se guarda la imágen procesada en la nueva ubicación
      .then(() => {
        file.path = outputPath; // Actualiza la ruta del archivo en req.file
        console.log('Imagen sin metadatos guardada en:', outputPath);
        unlinkSync(imagePath); // Elimina la imagen original
      })
      .catch((error) => {
        console.error(error);
      });
  });
  // Resuelve la promesa y da paso al siguiente middleware
  Promise.all(promises)
    .then(() => {
      next();
    })
    .catch((error) => {
      console.error(error);
      next();
    });
}; */

