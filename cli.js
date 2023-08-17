// Cli consumir promesas/mostrar data

const { mdLinks } = require("./index.js");

mdLinks("/noExiste/")
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });