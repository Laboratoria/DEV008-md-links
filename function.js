
const fs = require("fs");
const path = require("node:path");
const markdownLinkExtractor = require("markdown-link-extractor");

//verifico si existe la ruta
const validateFile = function (ruta) {
  return fs.existsSync(ruta);
};
//pregunto si la ruta es absoluta
const isAbsolute = function (ruta) {
  return path.isAbsolute(ruta);
};
//en caso de ser relativa la convierto en absoluta
const converAbsolute = function (ruta) {
  return path.resolve(ruta);
};
//valido si es un archivo
const isFile = function (ruta) {
  return fs.statSync(ruta).isFile();
};
//obtengo todos los archivos en un arreglo de promesas
const getPromisesFiles = (filesPath) => {
  let arrayPromiseArray = [];
  filesPath.forEach((path) => {
    arrayPromiseArray = [
      ...arrayPromiseArray,
      new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: "utf8" }, (err, data) => {
          if (err) {
            reject(Error(`Error reading the file: ${path}`));
          }
          resolve(data);
        });
      }),
    ];
  });
  return Promise.allSettled(arrayPromiseArray);
};

const getLinks = function (ruta, options, resolve) {
  // se crea un arreglo de promesas para guardar lectura de cada ruta de archivos
  getPromisesFiles(ruta).then((results) => {
    let links = [];
    // todas las rutas de los archivos en un array
    // iterar cada una de las rutas y obtener sus links
    results.forEach((result) => {
      const objectLinks = markdownLinkExtractor(result.value, true);
      let arrayLinks = objectLinks.links;
      const transformedLinks = arrayLinks.map((link) => ({
        href: link.href,
        text: link.text,
        file: ruta,
      }));
      links = [...links, ...transformedLinks];
    });
    check(links, options, resolve);
  });
};

const getPromisesHrefArray = (links) => {
  let arrayPromiseArray = [];
  links.forEach((link) => {
    arrayPromiseArray = [...arrayPromiseArray, fetch(link.href)];
  });
  return Promise.allSettled(arrayPromiseArray);
};
//creo funcion para las options
const check = function (links, options, resolve) {
  if (options !== undefined && typeof options === "object") {
    if (options.validate && options.stats) {
      getPromisesHrefArray(links).then((results) => {
        const newLinks = resultLinks(links, results);
        const brokenLinks = newLinks.filter((obj) => {
          return obj.ok === "fail";
        });
        const linkStats = validateStats(newLinks);
        resolve(`
        Total: ${linkStats.total}
        Unique: ${linkStats.unique}
        Broken: ${brokenLinks.length}
        `);
      });
    } else if (options.stats) {
      const linkStats = validateStats(links);

      resolve(`
      Total: ${linkStats.total}
      Unique: ${linkStats.unique}
      `);
    } else if (options.validate) {
      getPromisesHrefArray(links).then((results) => {
        const newLinks = resultLinks(links, results);
        resolve(newLinks);
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
const resultLinks = function (links, results) {
  const newlinks = links.map((link, linkIndex) => {
    const result = results[linkIndex];
    if (result.status === "rejected") {
      const statusCode = 404;
      return { ...link, status: statusCode, ok: "fail" };
    } else {
      const statusCode = result.value.status;
      return { ...link, status: statusCode, ok: "ok" };
    }
  });
  return newlinks;
};

const validateStats = function (links) {
  let converLinksInString = links.map((link) => {
    return `${link.href} ${link.text}`;
  });
  let arregloSinRepetidos = converLinksInString.filter(function (
    link,
    indice,
    arreglo
  ) {
    return arreglo.indexOf(link) === indice;
  });
  return {
    total: links.length,
    unique: arregloSinRepetidos.length,
  };
};
module.exports = {
  validateFile,
  isAbsolute,
  converAbsolute,
  isFile,
  getLinks,
  getPromisesFiles,
  resultLinks,
  getPromisesHrefArray,
  check,
  validateStats 
};
