//aqui registro funciones de md-link llamo las funciones
/* const axios =require('axios');
const  markdowLinkExtractor= require('node_modules/markdown-link-extractor');
*/
const Path = require("node:path");
/* const fetch = require('node-fetch'); */

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
        console.log("es absoluta");
        rutaCalculada = path;
      } else {
        console.log("no es absoluta");
        const conver = converAbsolute(path);
        rutaCalculada = conver;
        console.log(conver);
      }
      const file = isFile(rutaCalculada);
      if (file) {
        const extension = Path.extname(rutaCalculada);
        if (extension === ".md") {
          console.log("es un archivo");
          links = [...links, ...getLink(rutaCalculada)];
          check(links, options, resolve);
        } else {
          console.error("No es un archivo md");
        }
      } else {
        const readFile = getFilesWithRecursively(rutaCalculada);
        console.log(readFile, "readfile");
        // todas las rutas de los archivos en un array
        // iterar cada una de las rutas y obtener sus links
        readFile.forEach((pathFile) => {
          console.log(pathFile, "rutica");
          links = [...links, ...getLink(pathFile)];
        });
        check(links, options, resolve);
      }
    } else {
      reject(Error("no existe la ruta"));
    }
  });

// mdLinks("./pruebas/folder2/README4.md")
//   .then((links) => {
//     console.log(links);
//   })
//   .catch(console.error);

  mdLinks("./pruebas/folder2/README4.md", { validate: true })
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);

exports.module = {};
