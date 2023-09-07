const fetch = require('node-fetch');
// const fetch = (...args) => import('node-fetch')
//   .then(({ default: fetch}) => fetch(...args));

// const options = (validate) => new Promise((resolve, reject) => {
//   if (validate === true) {
//   }
// });

//Consultar al HTTP por medio de fetch
//Ver si el link funciona o no
//conteo total de links
//conteo total de links únicos
//conteo total de links rotos
//ver en que linea se encuentra el link

// //-------------------Respuesta HTTP------------------//
// const statusHttp = (url) => {}
// module.exports = {
//   options,
// };
fetch('https://platzi.com')
  .then((res) => console.log(res.status))
  .then((data) => console.log(data));
