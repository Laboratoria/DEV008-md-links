const marked = require('marked');
const fs     = require('fs');
const path   = require('path');
const fetchPromise = import('node-fetch');
const markdownit = require('markdown-it');
const markdownitAttrs = require('markdown-it-attrs');


const md = markdownit();
md.use(markdownitAttrs);

function extractLinks(filePath) {
    return new Promise((resolve, reject) => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const links = [];

        const tokens = md.parse(fileContent, {}); // Analizar el contenido Markdown en tokens

        tokens.forEach(token => {
            if (token.type === 'link_open') {
                const linkToken = tokens[tokens.indexOf(token) + 1]; // Siguiente token contiene la información del enlace
                const hrefAttr = linkToken.attrs.find(attr => attr[0] === 'href');
                const text = md.renderer.render([linkToken]); // Renderizar el contenido del enlace a texto

                links.push({
                    href: hrefAttr ? hrefAttr[1] : '',
                    text: text,
                    file: filePath
                });
            }
        });

        resolve(links);
    });
}

function validateLink(link) {
    return fetchPromise
    .then(fetchModule => fetchModule.default(link.href))
    .then(response => {
            link.status = response.status;
            link.ok = response.ok ? 'ok' : 'fail';
            return link;
        })
        .catch(error => {
            link.status = null;
            link.ok = 'fail';
            return link;
        });
}

function mdLinks(filePath, options) {
    return new Promise((resolve, reject) => {
        extractLinks(filePath)
            .then(links => {
                if (options.validate) {
                    const promises = links.map(validateLink);
                    Promise.all(promises)
                        .then(validatedLinks => {
                            resolve(validatedLinks);
                        })
                        .catch(error => {
                            reject(error);
                        });
                } else {
                    resolve(links);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = mdLinks;
