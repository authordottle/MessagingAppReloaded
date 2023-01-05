#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const jsonpkg = require('./package.json');
const directory = require('./lib/createProject');

let projectStrcuture = ['/controllers', '/routes', '/views', '/models', '/public', '/public/js', '/public/css', 
                        '/public/js/materialize', '/public/css/materialize', '/public/fonts', '/public/imgs'];

let filesStructure = ['/app.js', '/.env', '/Procfile', '/controllers/pageController.js', '/public/css/style.css', '/public/js/init.js',
                    '/public/css/materialize/materialize.min.css', '/public/js/materialize/materialize.min.js', '/routes/routes.js', '/views/index.ejs'];

program
    .version('-v, --version', jsonpkg.version)
    .description('An express generator')
    .usage('-n, <project name>')
    .option('-n, --name <name>', 'Project Name')
    .option('-u, --username <username>', 'Authentication')
    .option('p, --password <password>', 'The user\'s password')

program.parse(process.argv);

//name of the directory
let appName = './' + program.name;

//Define the package.json for the new app
let packageJson = {
    name: appName.substring(2),
    version: '0.0.1',
    scripts: {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    dependencies: {
        "express": "^4.14.0",
        "body-parser": "^1.15.2",
        "ejs": "^2.5.5"
    }
}

directory.createDirectory(appName, projectStrcuture)
    .then(() => {
        directory.loadAndWrite(filesStructure, appName);
    })
    .catch(() => {
        console.log("This Project " + appName.substring(1) + " already exists!");
    })
    .then(() => {
        directory.createPackageJson(appName, '/package.json', JSON.stringify(packageJson, null, 2) + '\n');
    })
    .then(() => {
        directory.instructions(appName);
    })


