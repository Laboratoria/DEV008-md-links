//aqui realizo funciones pequeñas
const fs = require("fs");
const path = require("node:path");
const markdownLinkExtractor = require("markdown-link-extractor");
const axios = require("axios");

//validarArchivos();
const validateFile = function (ruta) {
  return fs.existsSync(ruta);
};
const isAbsolute = function (ruta) {
  return path.isAbsolute(ruta);
};
const converAbsolute = function (ruta) {
  return path.resolve(ruta);
};
const isFile = function (ruta) {
  return fs.statSync(ruta).isFile();
};
console.log(isFile);
const read = function (ruta) {
  return fs.readFileSync(ruta, "utf-8", (err, data) => {
    if (err) {
      console.log("error: ", err);
    } else {
      console.log(data);
    }
  });
};

const getLink = function (ruta) {
  const readIng = read(ruta);
  const objectLinks = markdownLinkExtractor(readIng, true);
  let arrayLinks = objectLinks.links;
  const transformedLinks = arrayLinks.map((link) => ({
    href: link.href,
    text: link.text,
    file: ruta,
  }));
  return transformedLinks;
};

const getPromisesHrefArray = (links) => {
  let arrayPromiseArray = [];
  links.forEach((link) => {
    arrayPromiseArray = [...arrayPromiseArray, fetch(link.href)];
  });
  return Promise.allSettled(arrayPromiseArray);
};

const check = function (links, options, resolve) {
  if (options !== undefined && typeof options === "object") {
    if (options.validate && options.stats) {
      resolve("tiene validate y stats");
    } else if (options.stats) {
      resolve("tienr stats");
    } else if (options.validate) {
      getPromisesHrefArray(links).then((results) => {
        const  newlinks = links.map((link, linkIndex) => {
          const result = results[linkIndex];
          if (result.status === 'rejected') {
            const statusCode = 'Mayor 200';
            return {...link, status: statusCode, ok: 'fail'}
          } else {
            const statusCode = result.value.status;
            return {...link, status: statusCode, ok: 'ok'}
          }
        });
        resolve(newlinks);
      });
    } else if (options.validate === false || options.stats === false) {
      resolve(links);
    } else {
      resolve("tiene opciones no requeridas");
    }
  } else {
    resolve(links);
  }
};
module.exports = {
  validateFile,
  isAbsolute,
  converAbsolute,
  isFile,
  read,
  getLink,
  check,
};
