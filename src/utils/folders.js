import { existsSync, mkdirSync, renameSync,writeFileSync,readFileSync } from "fs";
import { join } from "path";

export const createFolder = (folderPath) => {
  try {
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
      /* const productFolderPath = join(folderPath, 'producto');
      const presentationsFolderPath = join(folderPath, 'presentacion');
      mkdirSync(productFolderPath);
      mkdirSync(presentationsFolderPath);
      const foldersToIgnore = [`${folderName}/`];
      const gitignorePath = join(__dirname, '../../','.gitignore')
      if (existsSync(gitignorePath)) {
        // Lee el contenido actual del archivo .gitignore
        const currentContent = readFileSync(gitignorePath, 'utf8');
      
        // Verifica si las carpetas ya están en el .gitignore
        const foldersToAdd = foldersToIgnore.filter(folder => !currentContent.includes(folder));
      
        // Si hay carpetas para agregar, las agrega al contenido del archivo .gitignore
        if (foldersToAdd.length > 0) {
          const updatedContent = currentContent + '\n' + foldersToAdd.join('\n');
          writeFileSync(gitignorePath, updatedContent, 'utf8');
          console.log('Carpetas agregadas al archivo .gitignore');
        } else {
          console.log('Las carpetas ya están presentes en el archivo .gitignore');
        }
      } else {
        console.log('El archivo .gitignore no existe');
      } */
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
    const oldPath = join(__dirname, '../../public', oldRuc);
    const newPath = join(__dirname, '../../public', newRuc);
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