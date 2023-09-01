const fs = require('fs');
const path = require('path');

const pathExist = (filepath) => fs.existsSync(filepath); // Saber si un archivo ya existe en la ruta dada

const absolutePathConverter = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath;
  }
  return path.resolve(filepath);
};

const identifyFile = (filepath) => {
  const file = [];
  const dataFile = fs.statSync(filepath);
  if (dataFile.isFile()) {
    file.push(filepath);
    return file;
  }
  return scanDirectories(filepath);
};

const filterFile = (fileArray) => {
  const regExp = /\.[m][d]/.g;
  return fileArray.filter(() => {});
};

const scanDirectories = (directoryPath) => {
  const files = [];
  const getFiles = (dirPath) => {
    try {
      const readAllFolders = fs.readdirSync(dirPath);
      if (readAllFolders.length === 0) {
        console.log('This folder is empty');
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
      console.log('--->', err);
    }
  };
  getFiles(directoryPath);
  return files;
};

// const readFile = fs.readFile(filePath, 'utf-8', (err, data) => {
//     if(err) {
//         console.log('error: ', err);
//     } else {
//       // data  is the contents of the file
//         console.log(data);
//     }
// });

const readFolder = (directoryPath) => {
  // let pathAbsolute = absolutePathConverter(directoryPath);
  const typeFile = identifyFile(directoryPath);
  // let stats = fs.statSync(directoryPath);
  console.log(typeFile);
  // console.log(readAllFolder);
  // console.log(pathAbsolute)
// console.log(stats.isDirectory());
// if(readAllFolder === []) {
//     console.log('This folder is empty')
// }
};

readFolder('src/sample/folderA');
readFolder('src/sample/folderA/folderA.1/secondfile.md');

module.exports = {
  pathExist,
  absolutePathConverter,
  identifyFile,
  filterFile,
  scanDirectories,
};
