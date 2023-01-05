const fs = require('fs');
const path = require('path');

class Structure {

    /**
     * This function creates the project and project folders.
     * @param {String} appName
     * @param {Array} folderPath
     */

    static createDirectory(appName, folderPath) {
        return new Promise((resolve, reject) => {
            if(!fs.existsSync(appName)) {
                fs.mkdirSync(appName);
                console.log("Created: " + appName.substring(1));
                for(let i in folderPath){
                    fs.mkdirSync(appName + folderPath[i]);
                    console.log("Created: " + folderPath[i]);
                }
                resolve();

            } else {
                reject();
            }
        })
    }

    /**
     * This function reads the template files content and then writes the contents to the new project.
     * @param {Array} fileToLoad
     * @param {string} appName
     */

    static loadAndWrite(fileToLoad, appName) {
        let fileData = [];
        let dataPromise = new Promise(
            (resolve) => {
                for(let i in fileToLoad){
                    fileData[i] = fs.readFileSync(path.join(__dirname, '..', 'templates', fileToLoad[i]), "utf8");
                }
                resolve(fileData);
            }
        )
        dataPromise.then(data => {
            for(let i in fileToLoad){
                let fileToWrite = appName + fileToLoad[i];
                fs.writeFileSync(fileToWrite, data[i]);
            }
        });
    }

    /**
     * This function creates the package.json file defined in the index.js file.
     * 
     * @param {String} appName 
     * @param {String} filePath 
     * @param {String} jsonPackage 
     */
    static createPackageJson(appName, filePath, jsonPackage) {
        fs.writeFileSync(appName + filePath, jsonPackage);
    }

    /**
     * This function displays the instructions to the program
     *
     * @param {String} appName
     */

    static instructions(appName){
        return new Promise(
            (resolve) => {
                console.log("");
                console.log("Instructions: cd %s", appName.substring(2));
                console.log("");
                console.log("Instructions: npm install");
                console.log("");
                console.log("Instructions: Run the program using node app.js");
                console.log("");
                resolve();
            }
        )
    }
}    

module.exports = Structure;