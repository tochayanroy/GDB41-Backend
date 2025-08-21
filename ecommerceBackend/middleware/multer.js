const multer = require('multer')
const path = require('path')
const fs = require('fs')


const uploadpath = 'uploads/'

if(!fs.existsSync(uploadpath)) {
    fs.mkdirSync(uploadpath, {recursive : true})
}


const imageFileFilter = (req, file, cb) => {
    const fileType = /jpeg|jpg|png|webp/;

    const extname = fileType.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = fileType.test(file.mimetype);

    if(extname && mimetype) {
        return cb(null, true)
    } else {
        return cb(new Error('Only Image File are allowed'), false)
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadpath)
    },
    filename: function (req, file, cb) {
        const uniqueNumber = Date.now() + '-' + Math.round(Math.random()*1E9);
        const safename = path.basename(file.originalname.replace(/\s+/g, '-'))
        cb(null, uniqueNumber + '-' + safename)
    }, 
})

const uploads = multer({
    storage:storage,
    fileFilter:imageFileFilter,
    limits:{fileSize: 1 * 1024 * 1024}
})


const singleImageUplaod = uploads.single('image');
const multipleImageUplaod = uploads.array('image', 10);



module.exports = {uploads, singleImageUplaod, multipleImageUplaod};