console.log('hola mundo');

function suma(a, b) {
    return a + b
};

const resultado = suma(2, 3);
console.log(resultado);


console.log('hello world');

// module.exports = () => {
//   // ...
// };

/*const mdLinks = require("md-links");
const app = mdLinks(path, options);*/


//PRUEBAS//
const path = require('path');
//const pathAbsolute = path.isAbsolute(__filename); -----> Para saber si es una ruta absoluta <-------

//console.log(pathAbsolute)

//console.log(__filename) //------> Imprime la ruta completa del archivo <------//
//const options = require('options');
//const validate = options(); //Preguntar como ponerlo como propiedad de options//

const fs = require('fs');
//const readFile = fs.readFile(path[, options], callback)//----------> Para leer archivos en documentación <---------
const readMd = () => {
    const pathMd = path.join(__dirname, './example.md'); // Concatena la ruta relativa con la ruta absoluta del archivo deseado//
    const data = fs.readFileSync(pathMd, 'utf-8');
    return data
};

const data = readMd();
console.log(data);  //-----> Aquí no devuelve promesas, quité fs/promises <-----------//FUNCIONA//