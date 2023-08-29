//aqui realizo funciones pequeñas
const fs =require('fs');
const path =require('node:path');


const validarArchivos = function() {
// verificar si el archivo existe.
if(fs.existsSync('./pruebas/README2.md')){
  console.log('El archivo EXISTE');
}else{
  console.log('El archivo NO EXISTE');
}
/* fs.stat('./pruebas/README2.md', (err, stats) => {
  if (err) {
      console.log("El archivo NO EXISTE!");
  } else {
      console.log("El archivo EXISTE!");
    /*   console.log("Path is file:", stats.isFile());
    console.log("Path is directory:", stats.isDirectory()); */
  };
  validarArchivos();

//validar si es absoluta o relativa
const ruta = 'README2.md';
console.log('Ruta:', ruta);

if (path.isAbsolute(ruta)) {
 console.log('La ruta es absoluta.');
 //verificar si es archivo o carpeta
/*  */
 
 //leo el contenido del archivo
/* fs.readFile('README2.md', 'utf-8', (err, data) => {
  if(err) {
    console.log('error: ', err);
  } else {
    console.log(data);
  }
}); */
 
} else {
  const rutaAbsoluta = path.resolve(ruta);
    console.log('La ruta es relativa.');
}

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
module.exports = {
  validateFile,
  isAbsolute,
  converAbsolute,
};
