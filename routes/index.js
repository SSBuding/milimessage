
const express = require("express")
const controller = require('../controller/dbServer')

// 创建router对象
const router = express.Router()

router.get('/test', (req, res) => {
    // 测试
    res.render("test")
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
// 用户进入进行ip登记
router.post('/signip', (req, res) => {
    let ip = req.ip
    res.send({

        ip: ip
    })
})


module.exports = router