const config = require('./config');
const validation = require('./validation');

console.log('<<Searching...>>');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (config.pathExist(path)) {
    const isAbsolutePath = config.absolutePathConverter(path);
    const filePathToRead = config.identifyFile(isAbsolutePath);
    const isFileExtension = config.fileValidation(filePathToRead);
    config
      .extractLinks(isFileExtension)
      .then((arrayLinks) => {
        if (options.validate === true) {
          validation
            .statusHttp(arrayLinks)
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

// mdLinks('src/sample/folderB', { validate: false })
//mdLinks('src/sample/draft.md', {validate: true})
 mdLinks('src/sample/folderA', { validate: false })
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
