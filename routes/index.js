const express = require('express');
const routesAPI = express.Router();
const productRoutes = require('./product.routes');

routesAPI.get('/', (req, res) => res.status(200).json({data: [], message:'PROJETO IMD'}));

routesAPI.use('/product', productRoutes);

module.exports = routesAPI;