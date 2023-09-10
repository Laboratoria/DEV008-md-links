const fs    = require('fs');
const path  = require ('path');
const axios = require('axios');

/*---------------------------------------------*/
//    Validación de la ruta                     //
/*---------------------------------------------*/
function rutaExistente(route){
  if(fs.existsSync(route)){
    return true;
    }else{
    return false;
    }
}

/*---------------------------------------------*/
//    Transformar de la ruta en absoluta        //
/*---------------------------------------------*/
function rutaAbsoluta(route){
  if(!path.isAbsolute(route)){
    return path.resolve(route);
  }else {
    return route;
  }
}
/*---------------------------------------*/
// Validar si la ruta es un directorio   //
/*--------------------------------------*/
function rutaDirectorio(route) {
const stats =fs.statSync(route);
console.log(stats);
if(stats.isFile()){
  return [route];
}
  else if(stats.rutaDirectorio()){
    let array = [];
    const files = fs.readdirSync(route);
      files.forEach((file)=>{
        const nuevaRuta = path.join(route,file);
        const nuevoEstado =fs.statSync(nuevaRuta);
        if(nuevoEstado.isFile()){
          array.push(nuevaRuta);
        } else if (nuevoEstado.rutaDirectorio()){
          array =array.concat(rutaDirectorio(nuevaRuta));
        }
      });
      return array.filter(file => path.extname(file)=='.md');
  }
      return [];
}

/*-------------------------------------*/
//      Leer el contenido de la ruta   //
/*------------------------------------*/
function leerContenido(route) {
 const contenidoArreglo =[];
 route.forEach((pathFile) =>{
  const contenido =fs.readdirSync(pathFile,'utf-8');
  contenidoArreglo.push({filePath:pathFile, content:contenido});
 });
 return contenidoArreglo;
}
/*---------------------------------------*/
// Leer los links del documento          //
/*---------------------------------------*/
function extraerEnlaces(arr) {
   const enlacesArreglo = [];
   const rgx = /\[([^\]]+)\]\(([^)]+)\)/g;
    arr.forEach((file) =>{
      const igualEnlaces = file.content.match(rgx);
      if(igualEnlaces){
         igualEnlaces.forEach((emparejarEnlace) =>{
           const objeto = emparejarEnlace.match(/\[([^\]]+)\]\(([^)]+)\)/);
           const texto  = objeto[1];
           const enlace = objeto[2];
           enlacesArreglo.push({
            file : file.filePath,
            href: enlace,
            text: texto,
           })
         })
      }
    });
    return enlacesArreglo;
  }

/*---------------------------------------------*/
//  axios para retornar el status y el mensaje
/*---------------------------------------------*/

function preguntarAxiosHTTP(linksArrays) {
const promesasArreglo = linksArrays.map((item) =>{
  return axios
  .get(item.href)
  .then((response)=>{
    item.status = response.status
    item.mensaje = response.statusText
    return item
  })
  .catch((err) =>{
    if(err.response){
      item.status =err.response.status
      item.mensaje=err.response.statusText
    }else{
      item.status =404
      item.mensaje='No encontrado'
    }
    return item
  })
})
return Promise.all(promesasArreglo);
}

/*---------------------------------------*/
//        Retornar estadísticas          //
/*---------------------------------------*/
function retornarEstadisticas(array) {
const setEnlaces = new Set();
array.forEach(item => setEnlaces.add(item.href));
return {
  total: array.length,
  unique: setEnlaces.size
};
}

/*-------------------------------------------------*/
//    incluir a las estadisticas los enlaces rotos
/*-------------------------------------------------*/
function enlacesRotos(array) {
  const setEnlaces = new Set();
 array.forEach(item => setEnlaces.add(item.href));
 const enlaceQuebrado = arrayFilter(item => item.status === 404);
 return {
    total: array.length,
    unique: setEnlaces.size,
    broken: enlaceQuebrado.length
 };
}

/*-------------------------------*/
//    Exportar modulos
/*-------------------------------*/

module.exports = {rutaExistente, rutaAbsoluta, rutaDirectorio, leerContenido,retornarEstadisticas,enlacesRotos,preguntarAxiosHTTP,extraerEnlaces };
