const path = require('path');
const fs = require('fs');

const { marked } = require('marked');
const cheerio = require('cheerio');

const examplePath = 'example.md';

//PRUEBA DE FUNCION mdLinks - hacerlo en mdLinks // FUNCIONA //

function mdLinksTaster(userPath, options) {
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

function validateAbsolutePath(userPath) {
  const validatedAbsolutePath = path.isAbsolute(userPath);
  console.log('Absolute Path is ' + validatedAbsolutePath)
  return validatedAbsolutePath;
};

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

function identifyFileExtension(filePath) {
  const fileExt = path.extname(filePath);
  //console.log('File extension: ' + fileExt);
  return fileExt;
};
//const fileExt = identifyFileExtension(convertedAbsolutePath);

//Lee archivos//
function readFile(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  //console.log(fileData);
  return fileData;
};
//const fileData = readFile(convertedAbsolutePath);

/*--------------------------- PRUEBAS PARA STATUS y OK (Mensaje) --------------------------------*/

// petición HTTP  // Se puede separar en dos, una función que valide y otra que muestre el mensaje //
function validateLink(link) {
  const validatedLinks = [];
  link.forEach((element) => {
    fetch(element)
      .then(response => {
        validatedLinks.push({
          href: response.url,
          //text: response.textContent,
          status: response.status,
          ok: response.statusText
        })
        console.log(validatedLinks);
        return validatedLinks;
      })
      .catch(error => console.log('FAIL'));
  })

}
//validateLink(['https://www.youtube.com/', 'https://www.instagra.com/'])

function linksText(userPath) {
  const linksData = [];
  const fileContent = readFile(userPath);
  const htmlContent = marked(fileContent);
  const $ = cheerio.load(htmlContent);
  $('a').each(function () {
    const text = ($(this).text());
    const link = ($(this).attr('href'));
    linksData.push({
      href: link,
      text: text
    })
    console.log(linksData)
    return linksData
  });
};
//linksText('example.md');
