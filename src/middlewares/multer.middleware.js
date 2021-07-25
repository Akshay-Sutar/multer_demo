const multer = require('multer');
const path = require('path');
const { multer: multerOptions } = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, multerOptions.uploadPath);
    },
    filename: (req, file, cb) => {
        const { name: originalName } = path.parse(file.originalname);
        const extension = path.extname(file.originalname); //.png

        return cb(null, [originalName, '_', Date.now(), extension].join(''));
    },
    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname); //.png
        const whitelistRegex = new RegExp(multerOptions.whitelistedExtensions.join('|'), 'gi');

        if (!whitelistRegex.test(extension)) {
            return cb(new Error(`Allowed formats - ${new Intl.ListFormat('en').format(a)}`), null);
        }

        return cb(null, true);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: multerOptions.maxFileSize
    }
});

module.exports = upload.single('avatar');
