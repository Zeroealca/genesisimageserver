import { unlinkSync } from 'fs';
import multer, {diskStorage} from 'multer';
import sharp from 'sharp';
import { join } from 'path';

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

export const eliminarMetadatos = (req, res, next) =>{
  if (!req.files) {
    return next();
  }
  const {ruc, reference} = req.body;

  for (const file of req.files){
  const imagePath = join(__dirname,'../../',file.path); // Ruta de la imagen subida
  const outputPath = join(__dirname,'../',`${ruc}/${reference ?? ''}/${file.filename}`); // Ruta de salida deseada
  console.log({outputPath, root:__dirname})

  sharp(imagePath)
    .withMetadata(false)
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error(err);
          } else {
            file.path = outputPath; // Actualiza la ruta del archivo en req.file
            console.log('Imagen sin metadatos guardada en:', outputPath);
          }
          unlinkSync(imagePath); // Elimina la imagen original
          
        });}
        next();
}
