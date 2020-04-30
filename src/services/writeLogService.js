const fs = require('fs')
const config = require('../../config')
const format = require('date-fns/format');
class Log {
    constructor(folderLocation) {
        this.folderLocation = folderLocation;
    }

    async writeLog(content) {
        try {
            const fileName = this.folderLocation + '/' + format(new Date(), 'yyyyMMdd') + '.log';
            await this.write(fileName, content);
            await this.write(fileName, '\n');
        } catch(err) {
            throw err;
        }
        
    }
    write(file, content) {
        return new Promise((resolve, reject) => {
        fs.access(file, err => {
            if(err) {
                fs.writeFile(file, content, err => {
                    if(err)
                        return reject(err)
                    resolve();
                })
            } else {
                fs.appendFile(file, content, err => {
                    if(err)
                        return reject(err)
                    resolve();
                })
            }
        })
    });
    }
}

module.exports = new Log(config.logFileLocation);