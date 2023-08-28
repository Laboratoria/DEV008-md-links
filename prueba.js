/*const mdLinks = require('./mdl.cjs');
const response = mdLinks.main('prueba');
console.log('Prueba uno',response);
*/

const chalk = require('chalk')
const inquirer = require('inquirer')
const gradient = require('gradient-string')
const chalkAnimation = require('chalk-animation')
const { createSpinner } = require( 'nanospinner')

/*
console.log('-------------------')
const stats =fs.statSync('././file-1.md');
console.log(
stats.isFile(),
stats.isDirectory(),
stats.size()
);
*/
/*
globalThis.console.log(globalThis);
let userName;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Bienvenida a mi Librería,¿quieres conocerla? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('Ingresa el archivo o ruta a revisar')}
    Si, la ruta o archivo no cumple con que sea absoluta ${chalk.bgRed('termina el proceso')}
    Empezamos....

  `);
}
await welcome();

async function askName() {
  const answers = await inquirer.prompt({
    name: 'Nombre',
    type: 'input',
    message: '¿Cuál es tu nombre?',
    default() {
      return 'Nombre';
    },
  });

  userName = answers.player_name;

  console.log(`Gracias por ingresar... ${chalk.bgBlue(userName)}`);

}

console.clear();

await askName();

*/

function existPathandAbsoluteRelative(filepath){

  if(fs.existsSync(filePath)) {
          if(!path.isAbsolute(filepath)){
            console.log(chalk.yellow('Path is absolute & exists'))
            return
           } else  {
            console.log(chalk.green('Path is not absolute & exists'))
            return
          }
      } else {
        console.log(chalk.red('Path not found'))
        return null
      }
  }
  const providedPath = 'README.md';

  const result = existPathandAbsoluteRelative(providedPath);

  if (result) {
      console.log('Result:', result);
  }

// Transforma que la ruta sea absoluta
function transformLink(link){
}

// Validar que sea una archivo MD
function mdLinks(filePath,options){

}

// Leer archivo md (verla como función)
function readFile(path){

  return fs.readFile(path,'utf-8',(err,content)=>{
        if(err){
          console.error(err)
        } else {
          console.log(content)
        }
  });
}
console.log(chalk.blue(readFile('README.md')))

// Exportar el modulo
