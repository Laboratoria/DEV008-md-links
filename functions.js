//Contiene las funciones puras
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const allPath =
'C:\\Users\\ldcpd\\Desktop\\Md-Lindks\\DEV008-md-links\\examplesOfLinks\\linksMd.md';

const thePathExistOrNot = (allPath) => {
  if (fs.existsSync(allPath)) {
    return true;
  } else {
    return false;
  };
};
console.log(chalk.bold.blue(thePathExistOrNot(allPath)));
console.log(chalk.blue("Great! The path exist"));
