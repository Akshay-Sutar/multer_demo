const fs = require('fs/promises');
const { constants } = require('fs');
const path = require('path');
const { multer: multerOptions } = require('../config');

class FilesService {
    constructor() {
        this.list = this.list.bind(this);
        this.getAbsolute = this.getAbsolute.bind(this);
        this.exist = this.exist.bind(this);
        this.delete = this.delete.bind(this);
    }

    getAbsolute(fileName){
        return path.join(multerOptions.uploadPath, fileName);
    }

    async list() {
        const files = [];
        const directoryFiles = await fs.readdir(multerOptions.uploadPath);

        for (const fileName of directoryFiles) {
            const { size, birthtime: createdAt } = await fs.stat(this.getAbsolute(fileName));
            files.push({
                name: fileName,
                size: `${(size / (1024 * 1024)).toFixed(3)} MB`,
                createdAt
            });
        }

        files.sort((a, b) => a.createdAt - b.createdAt);
        return files;
    }

    async exist(fileName) {
        try {
            await fs.access(this.getAbsolute(fileName), constants.R_OK | constants.W_OK | constants.F_OK);
            return true;
        } catch {
            return false;
        }
    }

    delete(fileName) {
        fs.unlink(this.getAbsolute(fileName));
    }
}

module.exports = new FilesService();