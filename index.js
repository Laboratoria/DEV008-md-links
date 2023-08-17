const fs =require('fs');

const mdLinks = (path, options) => {
return new Promise((resolve, reject)=>{
//identifica si la ruta existe//
if(fs.existsSync(path)){
//ruta absoluta?//
//Probar si esa ruta es archivo o directorio//
//si es un  directorio que s¿filtre los archivos.md//
}
else{
//Si no existe la ruta, rechaza la promesa//
reject('La ruta no existe');
}

})
}

module.exports = () => {
  mdLinks
};
