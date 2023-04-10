const express = require('express');
const multer = require('multer');
const upload = multer(require('../config/upload'));
const routes = express.Router();

const {productValidReq} = require('../middleware');

const {productController} = require('../controllers');

routes.get('/', productController.findAll);
routes.get('/:FK_PRODUCT', productController.findOneById);
routes.post('/',productValidReq , productController.create);
routes.post('/:FK_PRODUCT', upload.single('file'), productController.upload);
routes.put('/:FK_PRODUCT', productController.update);
routes.delete('/', productController.delete);

module.exports = routes;