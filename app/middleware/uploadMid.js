var multer  = require('multer')
const mkdirp  = require('mkdirp');

const ImageStorage = multer.diskStorage({
    destination : (req , file , cb) => {
    
        console.log(file);
        let dir = 'public/images';

        mkdirp(dir , err => cb(err , dir))
    },
    filename: (req , file , cb) => {
        cb(null, Date.now() +  '-' + file.originalname ) 
    }
});


const imageFilter = (req , file , cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null , true)
    } else {
        cb(null , false)
    }
}

const uploadImage = multer({ 
    storage : ImageStorage,
    fileFilter : imageFilter
})


module.exports = {

    uploadImage
}