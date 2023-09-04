//aqui registro funciones de md-link llamo las funciones
/* const axios =require('axios');
const  markdowLinkExtractor= require('node_modules/markdown-link-extractor');
*/
const Path =require('node:path');
const fetch = require('node-fetch');

const {
  validateFile,
  isAbsolute,
  converAbsolute,
  isFile,
  getLink,
  isValidate,
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
      const extension = Path.extname(rutaCalculada);
      if (extension === '.md') {
        console.log("es un archivo");
        getLink(rutaCalculada);
      }else {
        console.error('No es un archivo md')
      }
    } else {
      const readFile = getFilesWithRecursively(rutaCalculada);
      console.log(readFile, 'readfile');
      // todas las rutas de los archvos en un array
      // iterar cada una de las rutas y obtener sus links
      readFile.forEach((pathFile)=>{
        console.log(pathFile, 'rutica');
        getLink(pathFile);
      })
      console.log("es una carpeta");
    }
  } else {
    console.log("no existe la ruta");
  }
  const validate = isValidate(rutaCalculada);
  console.log(validate, 'validacion');
};
main();
