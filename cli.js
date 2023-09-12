#!/usr/bin/env node
const {mdLinks} = require('./index.js');
const args = process.argv.slice(2);
const filePath = args[0];


const options = {
    validate: args.includes('--validate') || args.includes('-v'),
    stats: args.includes('--stats') || args.includes('-s')
};

if (options.validate && options.stats) {
    mdLinks(filePath, { validate: true })
        .then(links => {
            const totalLinks = links.length;
            const uniqueLinks = new Set(links.map(link => links.href)).size;
            const brokenLinks = links.filter(link => links.ok === 'fail').length;

            const statsTotal = `Total: ${totalLinks}`;
            const statsUnique= `\nUnique: ${uniqueLinks}`;
            const statsBroken = `\nBroken: ${brokenLinks}`;

            console.log(statsTotal);
            console.log(statsUnique);
            console.log(statsBroken);

        })
        .catch(error => {
            console.error(error);
        });
} else if (options.validate) {
    mdLinks(filePath, { validate: true })
        .then(links => {
            links.forEach(link => {
                console.log((`${link.file} ${link.href} ${link.ok} ${link.status}`));
            });
        })
        .catch(error => {
            console.error(error);
        });
} else if (options.stats) {
    mdLinks(filePath, {})
        .then(links => {
            const totalLinks = links.length;
            const uniqueLinks = new Set(links.map(link => link.href)).size;

            const statsTotal = `Total: ${totalLinks}`;
            const statsUnique= `\nUnique: ${uniqueLinks}`;
            console.log(statsTotal);
            console.log(statsUnique);

        })
        .catch(error => {
            console.error(error);
        });
} else {
    mdLinks(filePath, {})
        .then(links => {
            links.forEach(link => {
                console.log(`${link.file} ${link.href} ${link.text}`);
            });
        })
        .catch(error => {
            console.error(error);
        });
}
