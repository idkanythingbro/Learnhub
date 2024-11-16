
const multer = require('multer')
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("/tmp/"))
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniquePrefix + "_" + file.originalname)
    }
})

const upload = multer({
    storage: storage,
})



module.exports = upload