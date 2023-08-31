const fs = require('fs');
const path = require('path');

const draft = (directoryPath) => {
    const files = [];
    const scanDirectories = (dirPath) => {
        try {
            const readAllFolders = fs.readdirSync(dirPath);
            if(readAllFolders.length === 0) {
                console.log('This folder is empty')
            } else {
                readAllFolders.forEach(basePath => {
                    //console.log('este es el folder:',basePath);
                    const absolutePath = path.resolve(dirPath, basePath); // Aquí se guarda la ruta absoluta de la carpeta o archivo
                    let dataFile = fs.statSync(absolutePath);
                    if(dataFile.isDirectory()) {
                        scanDirectories(absolutePath)
                    } else {
                        files.push(absolutePath);
                    }
                })
            }
        } catch(err) {
            console.log('--->', err);
        }
    }
    scanDirectories(directoryPath)
    console.log(files)
    return files
}

draft('./src/sample/folderA/folderA.1')

// const readFolder = (directoryPath) => {
//     console.log(directoryPath)
//     let readAllFolder = fs.readdirSync(directoryPath);
//     let stats = fs.statSync(directoryPath);
// // console.log(readAllFolder);
// // console.log(stats.isDirectory());
// if(readAllFolder === []) {
//     console.log('This folder is empty')
// }
// }
// readFolder('src/sample/folderA/folderA.1');

//Identificar si la ruta existe
//SI EXISTE ver si es un ruta absoluta
//Convertir la ruta en absoluta en caso de no serlo
//devolver la ruta
//SI NO EXISTE rechaza la promesa
//Si rechaza la promesa mostrar mensaje de error: This path no exist
// const readFile = fs.readFile(filePath, 'utf-8', (err, data) => {
//     if(err) {
//         console.log('error: ', err);
//     } else {
//       // data  is the contents of the file
//         console.log(data);
//     }
// });

const pathOrFileExist = (filepath) => {
    return fs.existsSync(filepath); // Saber si un archivo ya existe en la ruta dada
}

const absolutePathConverter = (filepath) => {
    if(path.isAbsolute(filepath)){
        return filepath
    } else {
        return path.resolve(filepath)
    }
}
module.exports = {
    pathOrFileExist,
    absolutePathConverter,
    draft,
}