
const {rutaExistente, rutaAbsoluta, rutaDirectorio, leerContenido,retornarEstadisticas,enlacesRotos,preguntarAxiosHTTP,extraerEnlaces }= require("./functions.cjs");
const chalk = require('chalk');

/*-------------------------------
|                                |
|            PROMESA             |
|                                |
/*-------------------------------*/



const mdLinks = (route, options) => {
return new Promise((resolve,reject) => {
const existe = rutaExistente(route);
if(existe == true){
  const rutaAbsolutaValidada = rutaAbsoluta(route);
  console.log(rutaAbsolutaValidada);
  const archivoMd = rutaDirectorio(rutaAbsolutaValidada);
  const leerContenidoMd = leerContenido(archivoMd);
  if(leerContenidoMd.length === 0){
    reject ('De acuerdo a lo validado no se han encontrado archivo .md')
  }
  const arregloEnlace = extraerEnlaces(leerContenidoMd);
  if(options.validate === false && options.stats === false ){
    resolve(arregloEnlace)
  }
  const estadistica = retornarEstadisticas(arregloEnlace);
  if (options.validate === false && options.stats === true) {
        resolve(estadistica)
  }
  if (options.validate === true && options.stats === true){
    preguntarAxiosHTTP(arregloEnlace)
    .then((response) => {
      resolve(enlacesRotos(response))
    })
  }
  if (options.validate === true && options.stats === false) {
    const leerContenidoHTPP = preguntarAxiosHTTP(arregloEnlace);
    leerContenidoHTPP.then((response) => {
      resolve(response)
    })

  }
} else {
  reject('Ruta no valida')
}
});
}


/*-------------------------------*/
//    Exportar modulos
/*-------------------------------*/
module.exports = { mdLinks };

