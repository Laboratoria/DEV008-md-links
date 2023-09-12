const fs = require('fs');
const path = require('path');

//--------Saber si un archivo ya existe en la ruta dada----------//
const pathExist = (filepath) => fs.existsSync(filepath);

const absolutePathConverter = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath;
  }
  return path.resolve(filepath);
};
//-----------------Validar si es un archivo .md-------------------//
/*Primera forma
 const fileValidation2 = (fileArray) =>
  fileArray.filter((file) => path.extname(file) === '.md');*/
const fileValidation = (fileArray) => {
  const filterfile = fileArray.filter((file) => path.extname(file) === '.md');
  if (filterfile.length === 0) {
    throw new Error('it is not a markdown file');
  }
  return filterfile;
};

//----------------------Buscar entre carpetas--------------------//
const scanDirectories = (directoryPath) => {
  const files = [];
  const getFiles = (dirPath) => {
    try {
      const readAllFolders = fs.readdirSync(dirPath);
      if (readAllFolders.length === 0) {
        console.log('this folder is empty');
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

//-------------Identificar si es un archivo o carpeta------------//
const identifyFile = (filepath) => {
  const dataFile = fs.statSync(filepath);
  if (dataFile.isFile()) {
    const file = Array.of(filepath);
    return file;
  }
  return scanDirectories(filepath);
};

//---------------------------Leer archivo------------------------//
const readFile = (filepath, callback) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      callback(data); // data is the contents of the file
    }
  });
};

//---------------------------Obtener links-----------------------//
const extractLinks = (fileArray) => new Promise((resolve, reject) => {
  // const link = /!?\[([^\]]*)?\]\(((https?:\/\/)?[A-Za-z0-9\:\/\.\_]+)(\'(.+)\')?\)/gm;
  const link = /\[([^\]]+)\]\((http[s]?:\/\/[^)]+)\)/g;
  const tag = /^\[([\w\s\d]+)\]/;
  const url = /\(((?:\/|https?:\/\/)?[\w\d./?=#]+)\)$/;
  const arrayLinks = [];
  fileArray.forEach((file, i) => {
    readFile(file, (data) => {
      const links = data.match(link);

      if (links === null) {
        reject(new Error('no link found'));
        return;
      }

      const linksProperties = links.map((prop) => {
        const text = prop.match(tag);
        const href = prop.match(url);
        return {
          href: href[1],
          text: text[1],
          file,
        };
      });

      arrayLinks.push(linksProperties);
      if (i === fileArray.length - 1) {
        resolve(arrayLinks.flat());
      }
    });
  });
});

module.exports = {
  pathExist,
  absolutePathConverter,
  identifyFile,
  fileValidation,
  scanDirectories,
  readFile,
  extractLinks,
};
