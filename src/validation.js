const fetch = require('node-fetch');

//conteo total de links
//conteo total de links únicos
//conteo total de links rotos
//ver en que linea se encuentra el link
//--------------------------------Respuesta HTTP-------------------------------//
const statusHttp = (arrayLinks) => {
  const setPromises = arrayLinks.map((linkProp) => 
  fetch(linkProp.href)
    .then((response) => {
      return {
      ...linkProp,
      status: response.status,
      OK: response.status >= 400 ? 'fail' : 'ok',
    }
    })
    .catch((err) => {
      console.log(' =============================================================================================================');
      console.log("can't read url:", err.message);
      console.log(' =============================================================================================================');
      return {
        ...linkProp,
        status: null,
        OK: 'fail',
      };
    }));
  return Promise.all(setPromises);
};

//--------------------Conteo de links totales, únicos y rotos------------------//
const statusHref = (arrayLinks) => {
  const linksUnique = [...new Set(arrayLinks.map((link) => link.href))];
  const stats = {Total: 0, Unique: 0}
  for (let linkProp of arrayLinks) {
    if (linkProp.OK === 'fail') {
        stats.Total = arrayLinks.length
        stats.Unique = linksUnique.length
        stats.Broken = arrayLinks.filter((link) => link.OK === 'fail').length
    }}
    stats.Total = arrayLinks.length;
    stats.Unique = linksUnique.length;
  return stats;
};


// statusHttp([
//   {
//     href: 'https://hackernoon.com/',
//     text: 'Medium',
//     file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\folderA.1.1\\firstfile.md',
//   },
//   {
//     href: 'http://otherpagerandom.net/',
//     text: 'Other page random',
//     file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\folderA.1.1\\firstfile.md',
//   },
//   {
//     href: 'https://kinsta.com/es/',
//     text: 'Kinsta',
//     file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
//   },
//   {
//     href: 'https://docs.npmjs.com/',
//     text: 'Docs NPM',
//     file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
//   },
//   {
//     href: 'https://open.spotify.com/exit',
//     text: 'Spotify',
//     file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
//   },
// ])
//   .then((response) => {
//     console.log(response);
    // response.forEach((link) => {
    //   if (link.status !== null) {
    //     console.log(response);
    //   } else {
    //     console.log
    //     return response.filter((link) => link.status === null )
    //   }
    // });
  // })
  // .catch((err) => {
  //   console.log('Hubo un error, el error cayó aquí');
  //   console.log(err);
  // });

module.exports = {
  statusHttp,
  statusHref,
};
