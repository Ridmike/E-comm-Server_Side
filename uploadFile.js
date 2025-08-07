const multer = require('multer');
const path = require('path');

const storageCategory = multer.diskStorage({
    //  This tells Multer to save the uploaded file inside the ./public/category folder.
    destination: (req, file, cb) => {
        cb(null, './public/category');
    },
    filename: function (req, file, cb) {

        // Check file type based on its extension
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (extname) {
            cb(null, Date.now() + "_" + Math.floor(Math.random() * 1000) + path.extname(file.originalname));
        } else {
            cb("Error: File type not supported! Only .jpeg, .jpg, .png", false);
        }
    }
});

const uploadCategory = multer({
    storage: storageCategory,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
})

const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/products');
    },
    filename: function (req, file, cb) {

        // Check file type based on its extension
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (extname) {
            cb(null, Date.now() + "_" + file.originalname );
        } else {
            cb("Error: File type not supported! Only .jpeg, .jpg, .png", false);
        }
    }
});

const uploadProduct = multer({
    storage: storageProduct,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
})

const storagePosters = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/posters');
    },
    filename: function (req, file, cb) {
        // Check file type based on its extension
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (extname) {
            cb(null, Date.now() + "_" + file.originalname);
        } else {
            cb("Error: File type not supported! Only .jpeg, .jpg, .png", false);
        }
    }
});

const uploadPosters = multer({
    storage: storagePosters,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
})

const storagePoster = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/posters');
    },
    filename: function (req, file, cb) {
        // Check file type based on its extension
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (extname) {
            cb(null, Date.now() + "_" + file.originalname );
        } else {
            cb("Error: File type not supported! Only .jpeg, .jpg, .png", false);
        }
    }
});

const uploadPoster = multer({
    storage: storagePoster,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
})

module.exports = {
    uploadCategory,
    uploadProduct,
    uploadPoster
};