
const express = require("express")

// 创建router对象
const router = express.Router()

router.get('/test', (req, res) => {
    res.type('html')
    res.send("<h1>您访问的地址已被外星人劫持！</h1>")

})

module.exports = router