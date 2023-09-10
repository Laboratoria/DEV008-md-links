#!/usr/bin/env node
const chalk = require('chalk');
const meow = require('meow');
const { mdLinks } = require('./index');


const cli = meow(`
${chalk.yellowBright('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*')}
${chalk.blueBright('ʕ•́ᴥ•̀ʔっ')} BIENVENIDO      ${chalk.bgMagentaBright('ʕ•́ᴥ•̀ʔっ')}
${chalk.yellowBright('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*')}
${chalk.greenBright('Modo de uso')}
    $ mdlinks <path>

    ${chalk.greenBright('Opciones')}
    ${chalk.greenBright('--stats')}  ,                ${chalk.bold('Esta opción mostrará las estadísticas')}
    ${chalk.greenBright('--validate ')}               ${chalk.bold('Esta opción mostrará el resultado de la validación')}
    ${chalk.greenBright('--stats --validate')}        ${chalk.bold('Esta opción mostrará el resultado de las estadísticas y la validación')}
 ${chalk.yellowBright('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*')}
    `, {
      importMeta: require.meta,
    input: ['path'],
    flags: {
      validate: {
        type: 'boolean',
        shortFlag: 'V'
      },
      stats: {
        type: 'boolean',
        shortFlag: 'S'
      },

    }
  });

  if (cli.input[0] == undefined) {
    console.log('Ingresar ruta');
  } else {
    mdLinks(cli.input[0], cli.flags)
      .then(response => {
        if (cli.flags.stats === false) {
          response.forEach(item => {
            if (cli.flags.validate === true) {
              console.log(chalk.green(item.file), chalk.greenBright(item.href), chalk.yellow(item.text), chalk.yellowBright(item.status), chalk.bgYellowBright(item.mensaje));
            } else {
              console.log(chalk.green(item.file), chalk.greenBright(item.href), chalk.yellow(item.text));
            }
          });
        } else {
          if (cli.flags.validate === true) {
            console.log(chalk.blue('Total:'), response.total);
            console.log(chalk.green('Unique:'), response.unique);
            console.log(chalk.magenta('Broken:'), response.broken);
          } else {
            console.log(chalk.blue('Total:'), response.total);
            console.log(chalk.green('Unique:'), response.unique);
          }
        }
      })
      .catch(error => { console.log(error); });
  }
