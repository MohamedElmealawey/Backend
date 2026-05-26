const multer = require("multer");
 
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
});
 
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed"), false);
    }
};
 
const upload = multer({ storage, fileFilter });
 
module.exports = { upload };
 