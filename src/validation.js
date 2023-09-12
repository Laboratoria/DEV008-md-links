const fetch = require('node-fetch');

//conteo total de links
//conteo total de links únicos
//conteo total de links rotos
//ver en que linea se encuentra el link
//--------------------------------Respuesta HTTP-------------------------------//
const statusHttp = (arrayLinks) => {
  const setPromises = arrayLinks.map((linkProp) => {
    return fetch(linkProp.href)
      .then((response) => {
        return {
          ...linkProp,
          status: response.status,
          OK: response.status >= 400 ? 'fail' : 'ok',
        };
      })
      .catch((err) => {
        console.log('=========================================================================================================');
        console.log("can't read url:", err.message);
        console.log('=========================================================================================================');
        return {
          ...linkProp,
          status: null,
          OK: 'fail',
        };
      });
  });
  return Promise.all(setPromises);
};

//--------------------Conteo de links totales, únicos y rotos------------------//
// const statusHref = (arrayLinks) => {
//   for (let i = 0; i < arrayLinks.length; i++) {
//     const linkProp = arrayLinks[i];
//     let lin
//   //   // if (linkProp.OK === 'fail') {
//   //   //   const stats = {
//   //   //     Total: arrayLinks.length,
//   //   //     Unique: ,
//   //   //     Broken: arrayLinks.filter((link) => link.OK === 'fail').length;
//   //   //   };
//   //   //   return;
//   //   // }
//   //   const stats = {
//   //     Total: arrayLinks.length,
//   //     Unique: ,
//   //   };
//   //   console.log(stats);
//   //   return stats;
//   }
// };

// statusHref([
//   {
//     href: 'https://medium.com/',
//     text: 'Medium',
//     file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\folderA.1.1\\firstfile.md',
//     status: 403,
//     OK: 'fail',
//   },
//   {
//     href: 'http://otherpagerandom.net/',
//     text: 'Other page random',
//     file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\folderA.1.1\\firstfile.md',
//     status: 500,
//     OK: 'fail',
//   },
//   {
//     href: 'https://kinsta.com/es/',
//     text: 'Kinsta',
//     file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
//     status: 200,
//     OK: 'ok',
//   },
//   {
//     href: 'https://docs.npmjs.com/',
//     text: 'Docs NPM',
//     file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
//     status: 200,
//     OK: 'ok',
//   },
//   {
//     href: 'https://open.spotify.com/exit',
//     text: 'Spotify',
//     file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
//     status: 404,
//     OK: 'fail',
//   },
// ]);

statusHttp([
  
      {
        href: 'https://medium.com/',
        text: 'Medium',
        file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\folderA.1.1\\firstfile.md',
        status: 403,
        OK: 'fail',
      },
      {
        href: 'http://otherpagerandom.net/',
        text: 'Other page random',
        file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\folderA.1.1\\firstfile.md',
        status: 500,
        OK: 'fail',
      },
      {
        href: 'https://kinsta.com/es/',
        text: 'Kinsta',
        file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
        status: 200,
        OK: 'ok',
      },
      {
        href: 'https://docs.npmjs.com/',
        text: 'Docs NPM',
        file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
        status: 200,
        OK: 'ok',
      },
      {
        href: 'https://open.spotify.com/exit',
        text: 'Spotify',
        file: 'C:\\Users\\kingk\\Laboratoria\\MD-links\\src\\sample\\folderA\\folderA.1\\secondfile.md',
        status: 404,
        OK: 'fail',
      },
    
])
  .then((response) => {
    console.log('Here')
    //console.log(response);
    //response.forEach((link, i) => {
      if (link.status !== null) {
        resolve(setPromises);
      }
    return response;
  })
  .catch((err) => {
    console.log('Hubo un error, el error cayó aquí');
    // console.log(err);
  });

module.exports = {
  statusHttp,
  //statusHref,
};
