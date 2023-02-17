const express = require('express')
const path = require('path')

// 解析html
const ejs = require('ejs')

const config = require('./config/default')


const app = express()

// 获取静态路径
app.use(express.static(path.resolve(__dirname + './dist')))
app.use(express.static(path.resolve(__dirname + './data')))

// 设置允许跨域访问该服务
app.use('*', function (req, res, next) {
    // 允许访问ip *为所有
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    res.header('Access-Control-Max-Age', '1728000');//预请求缓存20天
    // 方便返回JSON
    res.header("Content-Type", "application/json;charset=utf-8")

    if (req.method == 'OPTIONS') {
        // 让 OPTIONS 快速返回
        res.sendStatus(200)
    } else {
        next()
    }

})


// 加入html视图
app.set("view engine", "ejs")
// 配置模板的路径
app.set("views", path.resolve(__dirname, "views"))

// 解析前端数据
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 引入路由
require(('./routes/index'))(app)
// require(('./routes/files'))(app)

// 监听端口
app.listen(config.port, () => {
    console.log(`服务已开启,可以尝试访问http://localhost:${config.port}`)
})
