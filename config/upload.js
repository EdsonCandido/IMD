const multer = require('multer');
const path  = require('path');
const crypto = require('crypto');

// const tmpDir = path.resolve(__dirname, '..', 'public','img');
const tmpDir = path.resolve(__dirname, '..', 'tmp');
const storageTypes = {
    local: multer.diskStorage({
        destination: tmpDir,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;
            return callback(null, fileName);
        }, 
    }),
};

module.exports = {
    directory: tmpDir,
    storage: storageTypes.local,
    fileFilter: (request, file, callback) => {
        const extensoesPermitidas = /jpeg|jpg/i;
        if(extensoesPermitidas.test(file.mimetype)){
            return callback(null, true);
        }else{
            return callback('Tipo de arquivo não permitido!');
        }
    },

}
