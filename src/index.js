const config = require('./config');
const validation = require('./validation');

console.log('<<Searching...>>');

//const options = { validate: false };

const mdLinks = (path, options) =>
  new Promise((resolve, reject) => {
    if (config.pathExist(path)) {
      const isAbsolutePath = config.absolutePathConverter(path);
      const filePathToRead = config.identifyFile(isAbsolutePath);
      const isFileExtension = config.fileValidation(filePathToRead);
      config.extractLinks(isFileExtension)
        .then((arrayLinks) => {
          if (options.validate === true) {
            validation.statusHttp(arrayLinks)
              .then((setPromises) => {
                resolve(setPromises);
              })
              .catch((err) => {
                reject('There was an error:', err);
              });
          } else {
            resolve(arrayLinks);
          }
        })
        .catch((err) => reject(err));
    } else {
      reject(new Error('The path does not exist'));
    }
  });

module.exports = {
  mdLinks,
};
