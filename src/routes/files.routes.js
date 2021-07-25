const { Router } = require('express');
const filesController = require('../controllers/files.controller');
const multerMiddleware = require('../middlewares/multer.middleware');
const router = Router();

router.get('/', filesController.list);
router.get('/:file', filesController.get);
router.post('/', multerMiddleware, filesController.create);
router.post('/delete/:file', filesController.delete);

module.exports = router;