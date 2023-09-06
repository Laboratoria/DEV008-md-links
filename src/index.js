const config = require('./config');

console.log('<<Searching...>>');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (config.pathExist(path)) {
    const isAbsolutePath = config.absolutePathConverter(path);
    const filePathToRead = config.identifyFile(isAbsolutePath);
    const fileExtension = config.fileValidation(filePathToRead);
    config.extractLinks(fileExtension)
      .then((arrayProperties) => resolve(arrayProperties))
      .catch((err) => reject(err));
  } else {
    reject(new Error('The path does not exist'));
  }
});

// mdLinks('src/sample/draft.txt')
// mdLinks('src/sample/draft.md')
 mdLinks('src/sample/folderA')
//mdLinks('src/sample/empty.md')
  .then((result) => {
    console.log('El procedimiento esta correcto');
    console.log(result);
  })
  .catch((error) => {
    console.log('Fallo el procedimiento');
    console.log(error);
  });

module.exports = {
  mdLinks,
};
