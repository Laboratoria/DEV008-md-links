const fs = require("fs");
const path = require("path");

const pathExist = (filepath) => fs.existsSync(filepath); // Saber si un archivo ya existe en la ruta dada

const absolutePathConverter = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath;
  }
  return path.resolve(filepath);
};

const fileValidation = (fileArray) => {
  try {
    const filterfile = fileArray.filter((file) => path.extname(file) === ".md");
    if (filterfile.length === 0) {
      throw new Error("it is not a markdown file");
    }
    console.log(filterfile);
    // Problema: no me devuelve nada al ejecutarlo, ni undefined
  } catch (error) {
    console.log(error);
  }
};

const scanDirectories = (directoryPath) => {
  const files = [];
  const getFiles = (dirPath) => {
    try {
      const readAllFolders = fs.readdirSync(dirPath);
      if (readAllFolders.length === 0) {
        console.log("this folder is empty");
      } else {
        readAllFolders.forEach((basePath) => {
          // console.log('este es el folder:',basePath);
          const absolutePath = path.resolve(dirPath, basePath); // Aquí se guarda la ruta absoluta de la carpeta o archivo
          const dataFile = fs.statSync(absolutePath);
          if (dataFile.isDirectory()) {
            getFiles(absolutePath);
          } else {
            files.push(absolutePath);
          }
        });
      }
    } catch (err) {
      console.log("--->", err);
    }
  };
  getFiles(directoryPath);
  return files;
};

const identifyFile = (filepath) => {
  const dataFile = fs.statSync(filepath);
  if (dataFile.isFile()) {
    const file = Array.of(filepath);
    console.log(file);
    return file;
  }
  return scanDirectories(filepath);
};

const readFile = (filepath) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      // data  is the contents of the file
      console.log(data);
    }
  });
};

// const extractLinks = 
// identificar los links
// guardar los links en un arreglo con objetos

const readFolder = (directoryPath) => {
  //fileValidation(directoryPath);
    readFile(directoryPath);
  // scanDirectories(directoryPath);
  // let stats = fs.statSync(directoryPath);
  // console.log(typeFile);
  // }
};

//readFolder('src/sample/folderA');
// readFolder('src/sample/folderA/folderA.1/secondfile.md');
 // readFolder('src/sample/draft.txt');
//readFolder(['src/sample/draft.md']);

module.exports = {
  pathExist,
  absolutePathConverter,
  identifyFile,
  fileValidation,
  scanDirectories,
  readFile,
};
