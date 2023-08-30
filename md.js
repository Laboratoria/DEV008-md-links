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

  // 8) REVISAR

  const options = {
    hostname: 'localhost',
    port: 80,
    path: '/',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`Status code: ${res.statusCode}`);
  })
  req.on('error', (error) => {
    console.error(error);
  });

  req.end();
  ///////////////////////////////////////////////////////////////
  /*function validateLink(link) {
    const protocol = link.startsWith('https') ? https : http;
    return new Promise((resolve, reject) => {
      protocol.get(link, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve(true); // Link is valid
        } else {
          resolve(false); // Link is invalid
        }
      }).on('error', (err) => {
        reject(err);
      });
    });
  };
  validateLink(links);
  */

/*const https = require('https');

const options = {
  hostname: 'example.com',
  port: 443,
  path: '/',
  method: 'GET'
};

const req = https.request(options, (res) => {
  console.log(`Status code: ${res.statusCode}`);
  
  res.on('data', (chunk) => {
    console.log(chunk.toString());
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();*/

///////////////////////////////////////////////////////////////

/*const http = require('http');

function validateLink(link) {
  return new Promise((resolve, reject) => {
    const req = http.get(link, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve(true); // Link is valid
      } else {
        resolve(false); // Link is invalid
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
}

// Example usage:
const link = links;

validateLink(link)
  .then((isValid) => {
    console.log(`Link ${link} is ${isValid ? 'valid' : 'invalid'}`);
  })
  .catch((error) => {
    console.error(error);
  });*/