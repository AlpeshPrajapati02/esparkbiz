const multer = require('multer');


const imgStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/imgs')
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})

const apkStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/apps')
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})

module.exports = {
    imgStorage,
    apkStorage
}