
const express = require("express")
const controller = require('../controller/dbServer')
// 创建router对象
const router = express.Router()

router.get('/test', (req, res) => {
    // 测试
    res.send("<h1>您访问的地址已被外星人劫持！</h1>")
})
router.post('/insertwall', (req, res) => {
    controller.insertWall(req, res)
})
router.post('/insertfeedback', (req, res) => {
    controller.insertFeedback(req, res)
})
router.post('/insertcomment', (req, res) => {
    controller.insertComment(req, res)
})
router.delete('/deletewall', (req, res) => {
    controller.deleteWall(req, res)
})
router.delete('/deletefeedback', (req, res) => {
    controller.deleteFeedback(req, res)
})
router.delete('/deletecomment', (req, res) => {
    controller.deleteComment(req, res)
})
router.post('/findwallpage', (req, res) => {
    controller.findWallPage(req, res)
})
router.post('/findcommentpage', (req, res) => {
    controller.findCommentPage(req, res)
})
module.exports = router