// Dar un path 

// 1) Verificar que el path es válido -----> T/F

// 2) Si es válida (T) -----> Validar ruta absoluta -----> T/F

// 3) Si no es absoluta (F) -----> convetir 
                    
// 4) Identificar si es archivo o directorio -----> trabajar con archivo

// 5) Archivo -----> identificar extensión .md

// 6) Leer el archivo

// 7) Identificar links

                    //**COMPLETADO**//


const path = require('path');
const fs = require('fs');

const examplePath = 'example.md'; //Debe ser un string vacío/ Se llena para pruebas aquí // Con filename si lo valida correctamente

// 1)
function validatePath(userPath) { //Solo acepta rutas relativas **SOLUCIONAR** // Con filename o direname si lo valida correctamente
    try {
        fs.accessSync(userPath);
        console.log('Valid path')
        validateAbsolutePath(userPath);
        return true;
    } catch (error) {
        console.log('Invalid path')
        return false;
    }
}
validatePath(examplePath);

// 2)
function validateAbsolutePath(userPath) {
    const validatedAbsolutePath = path.isAbsolute(userPath);
    console.log('Absolute Path is ' + validatedAbsolutePath)
    return validatedAbsolutePath;
};

    //TRATAR DE FUSIONAR VALIDAR Y CONVERTIR CON IF//

// 3)
function convertToAbsolutePath(relativePath) {
    const absolutePath = path.resolve(relativePath);
    console.log('Absolute path:', absolutePath);
  return absolutePath
};
const convertedAbsolutePath = convertToAbsolutePath(examplePath);
//console.log(convertedAbsolutePath);

//4)
function identifyFile(filePath) {
    try {
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        //console.log(stats);
        console.log(`${filePath} is a file.`);
      } else {
        console.log(`${filePath} is not a file.`);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
identifyFile(convertedAbsolutePath);

// 5)

function identifyFileExtension(filePath) {
    const fileExt = path.extname(filePath);
    console.log('File extension: ' + fileExt);
    return fileExt;
  };
const fileExt = identifyFileExtension(convertedAbsolutePath);

// 6)
function readFile(filePath){
    const fileData = fs.readFileSync(filePath, 'utf8');
    console.log(fileData);
    return fileData;
};
const fileData = readFile(convertedAbsolutePath);

function findLinksInFile(filePath) {
    try {
        filePath = fileData;
      const linkRegex = /https?:\/\/[^\s]+/g;
      const links = filePath.match(linkRegex);
      console.log('Links found:', links);
      return links;
    } catch (error) {
      console.log('Error:', error);
    }
  };
  findLinksInFile(convertedAbsolutePath);