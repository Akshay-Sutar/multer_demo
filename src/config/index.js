const path = require('path');

module.exports = {
    appPort: 4000,
    multer: {
        uploadPath: path.join(__dirname, '..', 'uploads'),
        whitelistedExtensions: ['.jpeg', '.jpg', '.png', '.bmp'],
        maxFileSize: 1 * 1024 * 1024
    }
};
