// Dar un path 

// 1) Verificar que el path es válido -----> T/F

// 2) Si es válida (T) -----> Validar ruta absoluta -----> T/F

// 3) Si no es absoluta (F) -----> convetir



const path = require('path');
const fs = require('fs');

const examplePath = 'example.md'; //Debe ser un string vacío/ Se llena para pruebas aquí // Con filename si lo valida correctamente

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

// 2)
function validateAbsolutePath(userPath) {
    const validatedAbsolutePath = path.isAbsolute(userPath);
    console.log('Absolute Path is ' + validatedAbsolutePath)
    return validatedAbsolutePath;
};

// 3)
function convertToAbsolutePath(relativePath) {
    const absolutePath = path.resolve(relativePath);
    console.log('Absolute path:', absolutePath);
  return absolutePath
}
convertToAbsolutePath(examplePath);

