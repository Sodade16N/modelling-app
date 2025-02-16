const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type,please upload only Image'))
    }
};

const limits = {
    limits: 1024 * 1024 * 10
};

const upload = multer({
    storage,
    fileFilter,
    limits
});

module.exports = upload