//aqui realizo funciones pequeñas
const fs = require("fs");
const path = require("node:path");
const markdownLinkExtractor = require("markdown-link-extractor");


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
      getPromisesHrefArray(links).then((results) => {
        const newLinks = resuLinks(links, results);
        const brokenLinks = newLinks.filter(obj => {
          return obj.ok === 'fail';
        })
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
        const newLinks = resuLinks(links, results);
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
const resuLinks = function (links, results) {
  const newlinks = links.map((link, linkIndex) => {
    const result = results[linkIndex];
    if (result.status === "rejected") {
      const statusCode = 400;
      return {...link, status: statusCode, ok: "fail" };
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
  read,
  getLink,
  getPromisesHrefArray,
  check,
};
