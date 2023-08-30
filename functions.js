// Dar un path 

// 1) Verificar que el path es válido -----> T/F

// 2) Si es válida (T) -----> Validar ruta absoluta -----> T/F

// 3) Si no es absoluta (F) -----> convetir 

// 4) Identificar si es archivo o directorio -----> trabajar con archivo

// 5) Archivo -----> identificar extensión .md

// 6) Leer el archivo

// 7) Identificar links

//**COMPLETADO**//  FUNCIONA (PROBADO)

// 8) Validar links  //solicitud HTTP//


const path = require('path');
const fs = require('fs');
//const http = require('http');
const https = require('https');
//const fetch = require('node-fetch');

const examplePath = 'example.md'; //Debe ser un string vacío/ Se llena para pruebas aquí // Con filename si lo valida correctamente

//FUNCION QUE RELACIONA TODAS LAS FUNCIONES//
/*function mdLinksTaster(userPath) {  //AQUI SE JUNTAN TODAS LAS FUNCIONES Y SE RELACIONAN  - hacerlo en mdLinks
  let absolutePath = '';
    try {
      fs.accessSync(userPath);
      console.log('Valid path')
      if(validateAbsolutePath(userPath) === true) {
        console.log('Absolute Path is ' + userPath)
        absolutePath = userPath;
      }else {
        absolutePath = convertToAbsolutePath(userPath)
      };
      //console.log(absolutePath);
      if(identifyFile(absolutePath)=== true){
        identifyFileExtension(absolutePath);
      };
      if(identifyFileExtension(absolutePath) === '.md'){
        findLinksInFile(absolutePath);
      };
      return true;
    } catch (error) {
      console.log('Invalid path')
      return false;
    }
  }
  mdLinksTaster(examplePath);  //EJEMPLO//*/


// 1)
/*function validatePath(userPath) {  //AQUI SE crea el path absoluto funciona igual que la funcion createAbsolutePath
let absolutePath = '';
  try {
    fs.accessSync(userPath);
    console.log('Valid path')
    if(validateAbsolutePath(userPath) === true) {
      console.log('Absolute Path is ' + userPath)
      absolutePath = userPath;
    }else {
      absolutePath = convertToAbsolutePath(userPath)
    };
    //console.log(absolutePath);
    return absolutePath;
  } catch (error) {
    console.log('Invalid path')
    return false;
  }
}
validatePath(examplePath);  //EJEMPLO//*/

function validatePath(userPath) {
  try {
    fs.accessSync(userPath);
    //console.log('Valid path')
    return true;
  } catch (error) {
    console.log('Invalid path')
    return false;
  }
}
//validatePath(examplePath);  //EJEMPLO//

// 2)
function validateAbsolutePath(userPath) {
  const validatedAbsolutePath = path.isAbsolute(userPath);
  //console.log('Absolute Path is ' + validatedAbsolutePath)
  return validatedAbsolutePath;
};

//TRATAR DE FUSIONAR VALIDAR Y CONVERTIR CON IF//

// 3)
function convertToAbsolutePath(relativePath) {
  const absolutePath = path.resolve(relativePath);
  //console.log('Absolute path:', absolutePath);
  return absolutePath
};
//const convertedAbsolutePath = convertToAbsolutePath(examplePath);
//console.log(convertedAbsolutePath);

//FUNCION PARA CREAR PATH ABSOLUTO// NO FUNCIONA //
function createAbsolutePath(userPath) {
  let absolutePath = '';
  if (validatePath(userPath) === true) {
    if (validateAbsolutePath(userPath) === true) {
      console.log('Absolute Path is ' + userPath)
      absolutePath = userPath;
    } else {
      absolutePath = convertToAbsolutePath(userPath)
    };
  }
  console.log(absolutePath);
  return absolutePath
}
const absolutePath = createAbsolutePath(examplePath);

//4
function identifyFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      //console.log(stats);
      console.log(`${filePath} is a file.`);
      return true;
    } else {
      console.log(`${filePath} is not a file.`);
      return false;
    }
  } catch (error) {
    //console.log('Error:', error);
  }
};
//identifyFile(convertedAbsolutePath);

// 5)

function identifyFileExtension(filePath) {
  const fileExt = path.extname(filePath);
  console.log('File extension: ' + fileExt);
  return fileExt;
};
//const fileExt = identifyFileExtension(convertedAbsolutePath);
//console.log(fileExt);

// 6)
function readFile(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  console.log(fileData);
  return fileData;
};
//const fileData = readFile(convertedAbsolutePath);

// 7)
function findLinksInFile(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const linkRegex = /https?:\/\/[^\s]+/g;
  const links = fileData.match(linkRegex);
  console.log('Links:', links);
  return links;
};
//const links = findLinksInFile(absolutePath);

// 8) petición HTTP  // 
function validateLink(link) {
  return fetch(link)
    .then(response => response.status)
    //.then(response => console.log(response.status));
}
function validatedLink(filePath) {
  const links = findLinksInFile (filePath)
  links.forEach(link => {
    validateLink(link)
      .then(statusCode => {
        console.log(`Link: ${link}, Status Code: ${statusCode}`);
      });
  });
}
//validatedLink('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/testing_docs/DataLovers.md') //EJEMPLO//
validatedLink('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md') //EJEMPLO// ---MARCA UN ERROR ---
//console.log(server.address().port);


module.exports = {
  //validatePath: validatePath,
  //convertToAbsolutePath: convertToAbsolutePath,
  //convertToAbsolutePath: convertToAbsolutePath,
  //identifyFile: identifyFile,
  //identifyFileExtension: identifyFileExtension,
  readFile: readFile,
  findLinksInFile: findLinksInFile,
  createAbsolutePath: createAbsolutePath
};
