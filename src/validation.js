const fetch = require('node-fetch');

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
  const stats = {Total: 0, Unique: 0};
  const linkFail = (linkProp) => linkProp.OK === 'fail'
    if (arrayLinks.some(linkFail)) {
        stats.Total = arrayLinks.length
        stats.Unique = linksUnique.length
        stats.Broken = arrayLinks.filter((link) => link.OK === 'fail').length
    }
    stats.Total = arrayLinks.length;
    stats.Unique = linksUnique.length;
    console.log(stats)
  return stats;
};

module.exports = {
  statusHttp,
  statusHref,
};
