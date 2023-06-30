import multer, {diskStorage} from 'multer';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../");
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