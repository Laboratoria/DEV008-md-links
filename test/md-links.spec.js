const {mdLinks}  = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('Deberia devolver una promesa', () => {
   expect(mdLinks()).toBe (typeof Promise);
  });
it('Debe rechazar cuando path no existe',()=>{
  return(mdLinks('/ceci/archivo/noexiste.md')).catch((error) => {
expect(error).toBe('La ruta no existe');
  });
})
});
