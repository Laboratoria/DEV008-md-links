const fs = require('fs');
const path = require('path');
const config = require('./config.js');

console.log('<<Searching...>>');
// Saber si mi ruta existe
// Convertir mi ruta a absoluta
//Ver si es un directorio o archivo
//En caso de carpeta: Obtener el contenido de la carpeta
//En caso de archivo: leer archivo
//si se cumplen todos las instancias entonces devuelve un arreglo con objetos


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if(config.pathExist(path)) {
      const isAbsolutePath = config.absolutePathConverter(path);
      const isFilePath = config.identifyFile(isAbsolutePath);
      resolve(isAbsolutePath);
    } else {
      reject('The path does not exist')
    }
    //resolve('Correcto');
    //reject('Incorrecto');
    // allConditions.push('todas las funciones');
    // Promise.all(allConditions).resolve()
    // .then((result) => {
    //   Array().map((path) => {
    //     path = {
    //       href,
    //       text,
    //       file,
    //     }
    //   })
    //})
  });
}


mdLinks('C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample')
.then((result) => {
  console.log('El procedimiento esta correcto');
  console.log(result)
})
.catch((error) => {
  console.log(error);
});

module.exports = {
    mdLinks
}

x = 5
