//aqui registro funciones de md-link llamo las funciones
/* const axios =require('axios');
const  markdowLinkExtractor= require('node_modules/markdown-link-extractor');
const fetch =require('node:fetch'); */

const{
  validateFile,
  isAbsolute,
  converAbsolute,
}=require('./function.js')

//aqui llamo mis funciones de function en orden y traigo su logica
const main = function(){
const ruta = './pruebas/README2.md'
const exist = validateFile(ruta);


const absolute= isAbsolute(ruta);
if(absolute);

const conver = converAbsolute(ruta);


}
main();
