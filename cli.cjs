#!/usr/bin/env node

const mdLinks = require('./index.cjs');
const args = process.argv.slice(2);
const chalk = require('chalk');

const filePath = args[0];
const options = {
    validate: args.includes('--validate') || args.includes('-v'),
    stats: args.includes('--stats') || args.includes('-s')
};

if (options.validate && options.stats) {
    mdLinks(filePath, { validate: true })
        .then(links => {
            const totalLinks = links.length;
            const uniqueLinks = new Set(links.map(link => link.href)).size;
            const brokenLinks = links.filter(link => link.ok === 'fail').length;

            const statsTotal = `Total: ${totalLinks}`;
            const statsUnique= `\nUnique: ${uniqueLinks}`;
            const statsBroken = `\nBroken: ${brokenLinks}`;

            console.log(chalk.blue(statsTotal));
            console.log(chalk.green(statsUnique));
            console.log(chalk.magenta(statsBroken));

        })
        .catch(error => {
            console.error(chalk.red(error));
        });
} else if (options.validate) {
    mdLinks(filePath, { validate: true })
        .then(links => {
            links.forEach(link => {
                console.log(chalk.greenBright(`${link.file} ${link.href} ${link.ok} ${link.status}`));
            });
        })
        .catch(error => {
            console.error(chalk.red(error));
        });
} else if (options.stats) {
    mdLinks(filePath, {})
        .then(links => {
            const totalLinks = links.length;
            const uniqueLinks = new Set(links.map(link => link.href)).size;

            const statsTotal = `Total: ${totalLinks}`;
            const statsUnique= `\nUnique: ${uniqueLinks}`;
            console.log(chalk.yellow(statsTotal));
            console.log(chalk.yellow(statsUnique));

        })
        .catch(error => {
            console.error(chalk.red(error));
        });
} else {
    mdLinks(filePath, {})
        .then(links => {
            links.forEach(link => {
                console.log(chalk.green(`${link.file} ${link.href} ${link.text}`));
            });
        })
        .catch(error => {
            console.error(chalk.red(error));
        });
}
