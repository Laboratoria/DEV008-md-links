//aqui registro funciones de md-link llamo las funciones
/* const axios =require('axios');
const  markdowLinkExtractor= require('node_modules/markdown-link-extractor');
const fetch =require('node:fetch'); */

const {
  validateFile,
  isAbsolute,
  converAbsolute,
  isFile,
} = require("./function.js");
const { getFilesWithRecursively } = require("./api.js");
//aqui llamo mis funciones de function en orden y traigo su logica
const main = function () {
  const ruta = "./pruebas";
  const exist = validateFile(ruta);
  let rutaCalculada = "";
  if (exist) {
    const absolute = isAbsolute(ruta);
    if (absolute) {
      console.log("es absoluta");
      rutaCalculada = ruta;
    } else {
      console.log("no es absoluta");
      const conver = converAbsolute(ruta);
      rutaCalculada = conver;
      console.log(conver);
    }
    const file = isFile(rutaCalculada);
    if (file) {
      console.log("es un archivo");
    } else {
      const readFile = getFilesWithRecursively(rutaCalculada);
      console.log(readFile, 'readfile');
      console.log("es una carpeta");
    }
  } else {
    console.log("no existe la ruta");
  }
};
main();
