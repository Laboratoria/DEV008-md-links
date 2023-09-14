#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const validation = require('./validation.js');

const path = process.argv[2];
const validate = process.argv.includes('--validate');
const stats = process.argv.includes('--stats');

const alternatives = {
  validate: validate,
  stats: stats,
};

const options = {
  validate: false,
};

const cli = () => {
  try {
    if (path === undefined) {
      throw 'Please enter the path to the file you want to test :)';
    } else {
      if (!alternatives.validate && !alternatives.stats) {
        mdLinks(path, options)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (alternatives.validate && !alternatives.stats) {
        mdLinks(path, options.validate === true)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (!alternatives.validate && alternatives.stats) {
        mdLinks(path, options)
          .then((result) => {
            validation.statusHttp(result).then((setPromises) => {
                const statusLink = validation.statusHref(setPromises)
                console.log(statusLink);
            })
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (alternatives.validate && alternatives.stats) {
        mdLinks(path, options.validate === true)
          .then((result) => {
            const statusLink = validation.statusHref(result)
            console.log(statusLink);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

cli();

// #!/usr/bin/env node
// const { mdLinks } = require('./index');

// const route = process.argv[2]
// const validate = process.argv.includes('--validate');
// const stats = process.argv.includes('--stats');

// const options = {
//   validate: validate,
//   stats: stats,
// }

// mdLinks(route, options)
//   .then((result) => {
//     if (options.validate && options.stats) {
//       console.log(result);
//     } else if (options.validate) {
//       console.log(result);
//     } else if (options.stats) {
//       console.log(result);
//     } else {
//       console.log(result);
//     }
//   })
//   .catch((error) => {
//     console.error(error);
// });
