//aqui registro funciones de md-link llamo las funciones
const Path = require("node:path");

const {
  validateFile,
  isAbsolute,
  converAbsolute,
  isFile,
  getLinks,
} = require("./function.js");
const { getFilesWithRecursively } = require("./api.js");

//aqui llamo mis funciones de function en orden y traigo su logica
const mdLinks = (path, options) =>
  new Promise((resolve, reject) => {
    const exist = validateFile(path);
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
          getLinks([rutaCalculada], options, resolve);
        } else {
          reject(Error("No es un archivo md"));
        }
      } else {
        const readFile = getFilesWithRecursively(rutaCalculada);
        getLinks(readFile, options, resolve);
      }
    } else {
      reject(Error("No existe la ruta"));
    }
    
  });
  
module.exports = mdLinks;
