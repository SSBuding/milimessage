const db = require('../lib/db')


// 新建墙
exports.insertWall = async (req, res) => {
    const data = req.body
    await db.insertWall([data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgurl])
        .then(result => {
            res.send({
                code: 200,
                message: result
            })
        })
}

// 新建反馈
exports.insertFeedback = async (req, res) => {
    const data = req.body
    await db.insertFeedback([data.wallId, data.userId, data.type, data.moment])
        .then((result) => {
            res.send({
                code: 200,
                message: result
            })
        })
}

// 新建评论
exports.insertComment = async (req, res) => {
    const data = req.body
    await db.insertComment([data.wallId, data.userId, data.imgurl, data.moment, data.comment, data.name])
        .then((result) => {
            res.send({
                code: 200,
                message: result
            })
        })
}
// 删除墙
exports.deleteWall = async (req, res) => {
    const data = req.body
    // if (data.imgurl) {
    //     Mkdir.delFiles('data/' + data.imgurl)
    // }
    await db.deleteWall(data.id)
        .then((result) => {
            res.send({
                code: 200,
                message: result
            })
        })
}
// 删除反馈
exports.deleteFeedback = async (req, res) => {
    const data = req.body

    await db.deleteFeedback(data.id)
        .then((result) => {
            res.send({
                code: 200,
                message: result
            })
        })
}
// 删除评论
exports.deleteComment = async (req, res) => {
    const data = req.body

    await db.deleteComment(data.id)
        .then((result) => {
            res.send({
                code: 200,
                message: result
            })
        })
}

// 分页查询wall并获取点赞，举报，撤销数据
exports.findWallPage = async (req, res) => {
    const data = req.body
    await db.findWallPage(data.page, data.pagesize, data.type, data.label)
        .then(async (result) => {
            for (let i = 0; i < result.length; i++) {
                // 查找相应墙的点赞，举报，撤销数据
                // 喜欢
                result[i].like = await db.feedbackCount(result[i].id, 0)
                // 举报
                result[i].report = await db.feedbackCount(result[i].id, 1)
                // 要求撤销
                result[i].revoke = await db.feedbackCount(result[i].id, 2)
                // 是否点赞
                result[i].islike = await db.likeCount(result[i].id, data.userId)
                // 评论数
                result[i].comcount = await db.commentCount(result[i].id)

            }
            res.send({
                code: 200,
                message: result
            })
        })
}
// 倒序分页查墙的评论
exports.findCommentPage = async (req, res) => {
    const data = req.body
    await db.findCommentPage(data.page, data.pagesize, data.id)
        .then(result => {
            res.send({
                code: 200,
                message: result
            })
        })
}