import { existsSync, mkdirSync, renameSync } from "fs";
import { join } from "path";

export const createFolder = (ruc) => {
  try {
    const folderName = ruc;
    const folderPath = join(__dirname, '../', folderName);
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
      const gitignorePath = join(__dirname, '../../','.gitignore')
      if (fs.existsSync()) {
        // Lee el contenido actual del archivo .gitignore
        const currentContent = fs.readFileSync(gitignorePath, 'utf8');
      
        // Verifica si las carpetas ya están en el .gitignore
        const foldersToAdd = foldersToIgnore.filter(folder => !currentContent.includes(folderPath));
      
        // Si hay carpetas para agregar, las agrega al contenido del archivo .gitignore
        if (foldersToAdd.length > 0) {
          const updatedContent = currentContent + '\n' + foldersToAdd.join('\n');
          fs.writeFileSync(gitignorePath, updatedContent, 'utf8');
          console.log('Carpetas agregadas al archivo .gitignore');
        } else {
          console.log('Las carpetas ya están presentes en el archivo .gitignore');
        }
      } else {
        console.log('El archivo .gitignore no existe');
      }
      const productFolderPath = join(folderPath, 'producto');
      const presentationsFolderPath = join(folderPath, 'presentacion');
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