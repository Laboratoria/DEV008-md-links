//aqui registro funciones de md-link llamo las funciones
const Path = require("node:path");

const {
  validateFile,
  isAbsolute,
  converAbsolute,
  isFile,
  getLink,
  check,
} = require("./function.js");
const { getFilesWithRecursively } = require("./api.js");

//aqui llamo mis funciones de function en orden y traigo su logica
const mdLinks = (path, options) =>
  new Promise((resolve, reject) => {
    const exist = validateFile(path);
    let links = [];
    let rutaCalculada = "";
    if (exist) {
      const absolute = isAbsolute(path);
      if (absolute) {
        rutaCalculada = path;
      } else {
        const conver = converAbsolute(path);
        rutaCalculada = conver;
      }
      const file = isFile(rutaCalculada);
      if (file) {
        const extension = Path.extname(rutaCalculada);
        if (extension === ".md") {
          links = [...links, ...getLink(rutaCalculada)];
          check(links, options, resolve);
        } else {
          reject(Error("No es un archivo md"));
        }
      } else {
        const readFile = getFilesWithRecursively(rutaCalculada);
        // todas las rutas de los archivos en un array
        // iterar cada una de las rutas y obtener sus links
        readFile.forEach((pathFile) => {
          links = [...links, ...getLink(pathFile)];
        });
        check(links, options, resolve);
      }
    } else {
      reject(Error("No existe la ruta"));
    }
    
  });
  
module.exports = mdLinks;
