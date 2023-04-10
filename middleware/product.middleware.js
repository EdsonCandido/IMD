const Ajv = require('ajv');
const ajv = new Ajv();
const addFormats = require('ajv-formats');
const {productSchema} = require('../schemas');

const validateFormProduct = (req, res, next) => {
    
    const productReq = req.body;

    addFormats(ajv);

    const validate = ajv.compile(productSchema);
    const valid = validate(productReq);

    if(valid) return res.status(400).json({data: productReq, message: validate.errors});

    return next();
}


module.exports = validateFormProduct;