const multer = require('multer');
const uniqid = require('uniqid'); 
const path = require('path');
const maxSize = 2 * 1024 * 1024;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/uploads/')
    },
    filename: (req, file, cb) => {
        //cb(null, Date.now() + uniqid() + path.extname(file.originalname))
        cb(null, uniqid() + "_" +file.originalname)
    }
});

const upload = multer({
    storage: storage
//  limits: {fileSize : maxSize}
}); 

module.exports = upload;