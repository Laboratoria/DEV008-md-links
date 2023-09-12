
const {rutaExistente, rutaAbsoluta, isDirectory,filtroMd, leerContenido,retornarEstadisticas,enlacesRotos,preguntarAxiosHTTP,extraerEnlaces, esArchivo }= require('./functions.js');


/*-------------------------------
|                                |
|            PROMESA             |
|                                |
/*-------------------------------*/



const mdLinks = (path, options) => {
    return new Promise((resolve,reject) => {
        const validacionRutaAbsoluta = rutaAbsoluta(path);
        if(rutaExistente(validacionRutaAbsoluta) === false){
            reject('No es una ruta absoluta')
        }
        let arrayArchivos = [];
        if (esArchivo(validacionRutaAbsoluta) === true) {
            arrayArchivos.push(validacionRutaAbsoluta)
          } else {
            arrayArchivos = isDirectory(validacionRutaAbsoluta)
          }
          let arrayFilesMd = filtroMd(arrayArchivos)

          if (arrayFilesMd.length === 0) reject('No existen archivos .md ')

          let fileString = leerContenido(arrayFilesMd);


          const enlace = extraerEnlaces(fileString)


          if (options.validate === false && options.stats === false) {
            resolve(enlace);
          }
          if (options.validate === true && options.stats === false) {
            preguntarAxiosHTTP(enlace)
              .then((response) => resolve(response));
          }

          if (options.validate === false && options.stats === true) {
            resolve(retornarEstadisticas(enlace));
          }
          if (options.validate === true && options.stats === true) {
            preguntarAxiosHTTP(enlace)
              .then((response) => resolve(enlacesRotos(response)));
          }

        });
      };




    /*-------------------------------*/
    //    Exportar modulos
    /*-------------------------------*/
    module.exports = { mdLinks };

