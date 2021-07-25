const fileService = require('../services/files.service');

class FilesController {
    constructor() {
        this.list = this.list.bind(this);
        this.create = this.create.bind(this);
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
    }

    async list(req, res, next) {
        try {
            const files = await fileService.list();
            return res.render('pages/index', { files });
        } catch(err) {
            return next(err);
        }
    }

    create(req, res, next) {
        try {
            // HTTP 302 permanent redirect to list route
            return res.redirect('/files');
        } catch(err) {
            return next(err);
        }
    }

    async get(req, res, next) {
        try {
            if (!await fileService.exist(req.params.file)) {
                return res.render('pages/not-found', { originalUrl: req.params.file });
            }

            return res.sendFile(fileService.getAbsolute(req.params.file));
        } catch(err) {
            return next(err);
        }
    }

    async delete(req, res, next) {
        try {
            if (!await fileService.exist(req.params.file)) {
                return res.render('pages/not-found', { originalUrl: req.params.file });
            }

            await fileService.delete(req.params.file);
            return res.redirect('/files');
        } catch(err) {
            return next(err);
        }
    }
}

module.exports = new FilesController();