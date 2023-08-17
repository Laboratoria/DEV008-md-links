const{mdLinks} =('./index.js');
mdLinks('/noexiste/').then(() => {})
.catch((error) => {console.log (error)
});