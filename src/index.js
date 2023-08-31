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
//

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if(config.fileExist(path)) {
      const finallyPath = config.absolutePathConverter(path);
      resolve(finallyPath)
    } else {
      reject('La ruta no existe')
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
  console.log('El procedimiento falló');
  console.log(error);
});
//console.log('Aqui termina la promesa')

// const mdLinks = (filepath) => {
//     //const isAbsolutePath = config.absolutePath(filepath);
//     const isFileExist = config.fileExist(filepath)
//     if(isFileExist){
//         console.log('esta ruta existe');
//         console.log(isFileExist);

//     } else {
//         console.log('esta ruta no existe')
//     }

// }
// mdLinks('src/sample/folderC/folderC.2');

// module.exports = {
//     mdLinks
// }