const { ClientRequest } = require('http');
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
const statusHttp = (linksProperties) => {
  const setPromises = linksProperties.map((linkProp) => {
    return fetch(linkProp.href)
      .then((response) => {
        return {
          ...linkProp,
          status: response.status,
          OK: response.status >= 400 ? 'fail' : 'ok',
        };
      })
      .catch((err) => {
        console.log("can't read url:", err.message);
        return {
          ...linkProp,
          status: 500,
          OK: 'fail',
        };
      });
  });
  return Promise.all(setPromises);
};

// statusHttp(
//   [
//     {
//       href: 'https://open.spotify.com/exit',
//       text: 'Universia',
//       file: 'src/sample/draft.md',
//     },
//   ],
// )
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log('Hubo un error');
//     console.log(err);
//   });

module.exports = {
  statusHttp,
};

 //fetch('https://noexisteestapagina.com')
// fetch('https://platzi.net/')
// fetch('https://www.universia.net/es/home.html')
// fetch('https://www.lyft.com/riderCAR')
//   .then((res) => {
//     //console.log({ok: res.statusText >= 400 ? 'fail' : 'Ok', status: res.status }),
//     console.log(res.status); })
//   .catch((err) => {
//     console.log('Hubo un error');
//     console.log(err);
//   });
//.then((data) => console.log(data));
