//promesa-md-links
const fs = require("fs");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //identificar si la ruta existe
    if (fs.existsSync(path)) {
    } else {
    //si no existe la ruta se rechaza la promesa
      reject("The route doen't exist.");
    }
  });
};

module.exports = { mdLinks };
