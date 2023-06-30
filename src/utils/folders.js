import { existsSync, mkdirSync, renameSync } from "fs";
import { join } from "path";

export const createFolder = (ruc) => {
  try {
    const folderName = ruc;
    const folderPath = join(__dirname, '../', folderName);
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
      const productFolderPath = join(folderPath, 'products');
      const presentationsFolderPath = join(folderPath, 'presentations');
      mkdirSync(productFolderPath);
      mkdirSync(presentationsFolderPath);
      console.log("Carpeta creada exitosamente");
    }
    return {success:true, path: folderPath, msg: "Carpeta creada exitosamente"};
  } catch (error) {
    console.log(error);
    return {success:false, path: null, msg: error.message};
  }
}

export const renameFolder = (oldRuc, newRuc) => {
  try{
    const oldPath = join(__dirname, 'src', oldRuc);
    const newPath = join(__dirname, 'src', newRuc);
    if (existsSync(oldPath)) {
      renameSync(oldPath, newPath);
      console.log("Carpeta renombrada exitosamente");
    }
    return {success:true, path: newPath, msg: "Carpeta renombrada exitosamente"};
  } catch (error) {
    console.log(error);
    return {success:false, path: null, msg: error.message};
  }
}