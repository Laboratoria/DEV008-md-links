const marked = require('marked');
const fs = require('fs');
const path = require('path');
const fetchPromise = import('node-fetch');

function extractLinks(filePath) {
    return new Promise((resolve, reject) => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const links = [];

        const renderer = new marked.Renderer();
        renderer.link = (href, title, text) => {
            links.push({
                href: href,
                text: text,
                file: filePath
            });
        };

        marked.setOptions(fileContent, { renderer: renderer });

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
