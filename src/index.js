const config = require('./config');

console.log('<<Searching...>>');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (config.pathExist(path)) {
    const isAbsolutePath = config.absolutePathConverter(path);
    const isFilePath = config.identifyFile(isAbsolutePath);
    resolve(isFilePath);
  } else {
    reject('The path does not exist');
  }
  // resolve('Correcto');
  // reject('Incorrecto');
  // allConditions.push('todas las funciones');
  // Promise.all(allConditions).resolve()
  // .then((result) => {
  //   Array().map((path) => {
  //     path = {
  //       href,
  //       text,
  //       file,
  //     }
  //   })
  // })
});

mdLinks('C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample')
  .then((result) => {
    console.log('El procedimiento esta correcto');
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = {
  mdLinks,
};
