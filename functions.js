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

//Hacer función que me devuelva un objeto por cada validación de cada link-----> valor de retorno//



//Crear objeto de option con propiedad validate//

//---------*****---------Funciones de ejemplo están comentadas------------*****-----------//


const path = require('path');
const fs = require('fs');
const https = require('https');

const { marked } = require('marked');
const cheerio = require('cheerio');

const examplePath = 'example.md'; //Debe ser un string vacío/ Se llena para pruebas aquí // Con filename si lo valida correctamente

//FUNCION QUE RELACIONA TODAS LAS FUNCIONES//

//Options ---> validate (objeto)
const options = {
  validate: true
};
function mdLinksTaster(userPath, options) {  //AQUI SE JUNTAN TODAS LAS FUNCIONES Y SE RELACIONAN  - hacerlo en mdLinks // FUNCIONA //
  let absolutePath = '';

  if (!validatePath(userPath)) {
    return false;
  }
  if (validateAbsolutePath(userPath)) {
    console.log('Absolute Path is ' + userPath)
    absolutePath = userPath;
  } else {
    console.log('Absolute Path is ' + convertToAbsolutePath(userPath))
    absolutePath = convertToAbsolutePath(userPath)
  };
  //console.log(absolutePath);
  if (!identifyFile(absolutePath)) {
    return false
  };
  if (identifyFileExtension(absolutePath) === '.md') {
    findLinksInFile(absolutePath);
  } else {
    return false
  };
  return validatedLink(userPath);
};
//mdLinksTaster('example.md');  //EJEMPLO//**/

/*--------------------------- PRUEBAS PARA OBJETO CON VALOR DE RETORNO  --------------------------------*/

function createReturnValuesObject() {
  const returnValues = {
    href: link,
    text: linkText,
    file: filePath,
    status: statusCode,
    ok: statusMessage
  };
};

// 1)
function validatePath(userPath) {
  try {
    fs.accessSync(userPath);
    console.log('Valid path')
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
  console.log('Absolute Path is ' + validatedAbsolutePath)
  return validatedAbsolutePath;
};

// 3)
function convertToAbsolutePath(relativePath) {
  const absolutePath = path.resolve(relativePath);
  //console.log('Absolute path:', absolutePath);
  return absolutePath
};
//const convertedAbsolutePath = convertToAbsolutePath(examplePath);

//---------FUNCION PARA CREAR PATH ABSOLUTO-----------// 
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
//const absolutePath = createAbsolutePath(examplePath);

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
  //console.log('File extension: ' + fileExt);
  return fileExt;
};
//const fileExt = identifyFileExtension(convertedAbsolutePath);

// 6) //Lee archivos//
function readFile(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  //console.log(fileData);
  return fileData;
};
//const fileData = readFile(convertedAbsolutePath);

// 7) //Lee y encuentra los links en un archivo//
function findLinksInFile(filePath) {
  const fileData = readFile(filePath)
  const htmlContent = marked(fileData)
  const $ = cheerio.load(htmlContent);
  const result = [];
  console.log($('a'));
  $('a').each(() =>  {
    const object = {};
    console.log($(this).attr('href'));
    object.text = $(this).text();
    result.push(object);
  })
  //const links = $('a').map((index, element) => console.log( $(element).attr('href') + $(element).text())).get();
  //const textLinks = $('a').map((index, element) => $(element).text()).get();

  return result//.forEach(link => console.log(link)); //Devuelve un array con los links //
};
console.log(findLinksInFile('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md'));

//--------------->PRUEBAS PARA TEXTO EN LOS LINKS
function linksText(filePath) {
  const fileData = readFile(filePath)
  const htmlContent = marked(fileData)
  const $ = cheerio.load(htmlContent);
  const textLinks = $('a').map((index, element) =>$(element).text()).get();
  //console.log('Link texts:', textLinks);
  return textLinks
};
console.log(linksText('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md'));


/*--------------------------- PRUEBAS PARA STATUS y OK (Mensaje) --------------------------------*/

// 8) petición HTTP  // Se puede separar en dos, una función que valide y otra que muestre el mensaje //
function validateLink(link) {
  return fetch(link)
    .then(response => {
      if (response.status <= 200 && response.status < 400) {
        console.log(response.statusText);
      } else {
        console.log("FAIL");
      }
      return response.status;
    })
  //.then(response => console.log(response.status))
  //.catch (error=> console.log('Error:', error)); 
}

/*function validateLink(link) {
  return fetch(link)
      .then(response => response.status)
  };

function validateLinkMessage(statusCode){
  let message = '';
  if (statusCode <= 200 && statusCode < 400) {
    console.log('ok')
    message = 'ok'
  } else {
    console.log('fail');
    message ='fail'
  }
  return message;
};*/


/*function validatedLink(filePath) {
  const links = findLinksInFile(filePath)
  const statusValidation = validateLinkMessage(statusCode);
  links.forEach(link => {
    validateLink(link)
      .then(statusCode => {
        console.log(`Link: ${link} Status Code: ${statusCode} Status Message:${statusValidation} `);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};*/

function validatedLink(filePath) {
  const links = findLinksInFile(filePath)
  links.forEach(link => {
    validateLink(link)
      .then(statusCode => {
        console.log(`Link: ${link} Status Code: ${statusCode} `);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
//validatedLink('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/testing_docs/DataLovers.md') //EJEMPLO//FUNCIONA ---> 404
//validatedLink('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md') //EJEMPLO// FUNCIONA ---> 200
//console.log(validateLink('https://www.youtube.com/'))// FUNCIONA

/*--------------------------- PRUEBAS PARA ETIQUETAS <a> --------------------------------*/

//---------------PRUEBAS para cambiar un archivo a html-----------//

//const filePath = 'C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md';
//const fileContent = fs.readFileSync(filePath, 'utf-8');
//const htmlContent = marked(fileContent);
//console.log(htmlContent);// FUNCIONA-----Convierte el documento en html//

//---------Para encontrar etiquetas <a> y sus atributos------------// FUNCIONA//
//const $ = cheerio.load(htmlContent);
//const aLabels = $('a').map((index, element) => console.log($(element).text())).get();//---text--//
//const hrefLabels = $('a').map((index, element) => console.log($(element).attr('href'))).get();//---href--//
//console.log(searchingLabels);
