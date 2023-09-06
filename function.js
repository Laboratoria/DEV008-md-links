//aqui realizo funciones pequeñas
const fs =require('fs');
const path =require('node:path');
const markdownLinkExtractor = require('markdown-link-extractor');
const axios = require('axios');

//validarArchivos();
const validateFile = function (ruta){
  return fs.existsSync(ruta);
}
const isAbsolute = function (ruta){
 return path.isAbsolute(ruta);
}
const converAbsolute = function (ruta){
  return path.resolve(ruta);
}
 const isFile = function(ruta){
  return fs.statSync(ruta).isFile() 
}
console.log(isFile);
const read = function(ruta){
  return fs.readFileSync(ruta, 'utf-8', (err, data) => {
    if(err) {
      console.log('error: ', err);
    } else {
      console.log(data);
    }
  });
}

const getLink = function(ruta){
  const readIng = read(ruta);
  const  objectLinks  = markdownLinkExtractor(readIng, true);
  let arrayLinks = objectLinks.links;
  const transformedLinks = arrayLinks.map((link) => (
    {
      href: link.href,
      text: link.text, 
      file: ruta,
    }  
  ));
  return transformedLinks;
}

module.exports = {
  validateFile,
  isAbsolute,
  converAbsolute,
  isFile,
  read,
  getLink,
};
