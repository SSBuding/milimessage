

const multer = require("multer");



let storage = multer.diskStorage({
    //设置文件存储路径
    destination: (req, file, cb) => {
        cb(null, "./data/photo");
    },
    //设置文件存储名称
    filename: (req, file, cb) => {
        let type = file.originalname.replace(/.+\./, ".")
        cb(null, Date.now() + Math.floor(Math.random() * 100) + type)

    }
})
//上传单张图片
const upload = multer({ storage: storage }).single("photo");


module.exports = function (app) {
    app.post('/upload', upload, (req, res, next) => {
        //console.log(req)
        let name = req.file.filename
        let imgurl = '/photo/' + name
        res.send(imgurl)
    })

}