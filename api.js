// Importar los módulos 'fs' (file system) y 'path'
const Fs = require('fs');
const Path = require('path');

// Definir una función recursiva para obtener archivos de manera recursiva desde un directorio dado
const getFilesRecursively = (files, directory) => {
  // Obtener una lista de archivos y subcarpetas en el directorio actual
  const filesInDirectory = Fs.readdirSync(directory);
  
  // Iterar sobre cada elemento en el directorio actual
  filesInDirectory.forEach((file) => {
    // Obtener la ruta absoluta del archivo actual
    const absolute = Path.join(directory, file);
    
    // Obtener la extensión del archivo
    const extension = Path.extname(absolute);
    
    // Verificar si la ruta absoluta se refiere a una carpeta
    if (Fs.statSync(absolute).isDirectory()) {
      // Si es una carpeta, realizar una llamada recursiva para explorarla
      getFilesRecursively(files, absolute);
    } else if (extension === '.md') {
      // Si es un archivo con extensión ".md", agregar su ruta absoluta al array de archivos
      files.push(absolute);
    }
  });
};

// Definir una función que utiliza la función recursiva anterior para obtener archivos
const getFilesWithRecursively = (path) => {
  // Inicializar un array vacío para almacenar las rutas de los archivos
  const files = [];
  
  // Llamar a la función recursiva para obtener archivos
  getFilesRecursively(files, path);
  
  // Devolver el array de rutas de archivos
  return files;
};

// Exportar la función principal para su uso en otros archivos
module.exports = { getFilesWithRecursively };
