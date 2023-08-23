// Dar un path 

// 1) Verificar que el path es válido -----> T/F

// 2) Si es válida (T) -----> Validar ruta absoluta -----> T/F

// 3) Si no es absoluta (F) -----> convetir



const path = require('path');
const fs = require('fs');

const examplePath = 'README.md'; //Debe ser un string vacío/ Se llena para pruebas aquí

// 1)
function validatePath(userPath) { //Solo aceota rutas relativas **SOLUCIONAR**
    try {
        fs.accessSync(userPath);
        console.log('Valid path')
        validateAbsolutePath(userPath);
        return true;
    } catch (error) {
        console.log('Invalid path')
        return false;
    }
}
validatePath(examplePath);

/*if (validatePath(userPath)) {
    //validar ruta ABOLUTA
  console.log('Valid path');
} else {
  console.log('Invalid path');
};*/


// 2)
/*function validateAbsolutePath(path) {
  path.isAbsolute(path);
if (validateAbsolutePath(path)) {
    console.log(path);
    console.log('Valid absolute path')
    return true
  } else {
    console.log('Invalid absolute path');
  }
};
validateAbsolutePath(examplePath);*/

/*function validateAbsolutePath(userPath) {
    const validatedPath = validatePath(userPath); 
    const validatedAbolutePath = path.isAbsolute(userPath);

    if (validatedPath === true && validatedAbolutePath === true ) {
        console.log(validatedAbolutePath)   
        console.log('Valid absolute path') 
        return validatedAbolutePath
    } else {
        //Convertir en ruta absoluta
        console.log('Invalid absolute path');
    };
};
validateAbsolutePath(examplePath);*/

function validateAbsolutePath(userPath) {
    const validatedAbsolutePath = path.isAbsolute(userPath);
    console.log('Absolute Path is ' + validatedAbsolutePath)
    return validatedAbsolutePath;
};
//validateAbsolutePath(examplePath);
