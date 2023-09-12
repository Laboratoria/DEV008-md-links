const config = require('./config');
const validation = require('./validation');

console.log('<<Searching...>>');

const mdLinks = (path, options) =>
  new Promise((resolve, reject) => {
    if (config.pathExist(path)) {
      const isAbsolutePath = config.absolutePathConverter(path);
      const filePathToRead = config.identifyFile(isAbsolutePath);
      const FileExtensionMd = config.fileValidation(filePathToRead);
      config.extractLinks(FileExtensionMd)
        .then((arrayLinks) => {
          if (options.validate === true) {
            validation.statusHttp(arrayLinks)
              .then((setPromises) => {
                resolve(setPromises);
              })
              .catch((err) => {
                console.log('There was an error');
                console.log(err);
              });
          }
          resolve(arrayLinks);
        })
        .catch((err) => reject(err));
    } else {
      reject(new Error('The path does not exist'));
    }
  });

//mdLinks('src/sample/draft.txt')
// mdLinks('src/sample/folderB')
//mdLinks('src/sample/draft.md')
mdLinks('src/sample/folderA', { validate: true })
//mdLinks('src/sample/empty.md')
  .then((result) => {
    console.log('Great!, all conditions were fulfilled');
    console.log(result);
  })
  .catch((error) => {
    console.log('Ups!, there was a failure');
    console.log(error);
  });

module.exports = {
  mdLinks,
};
