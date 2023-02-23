const mysql = require('mysql')

const config = require('../config/default')

const db = mysql.createConnection({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
})

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.WALL
})


// 直接使用query
const bdbs = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })

}
// 通过该方法获取链接
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

// 创建数据库
const wall = `create database if not exists WALL DEFAULT CHARSET utf8 collate utf8_general_ci `

const createDatabase = (db) => {
    return bdbs(db, [])
}

// 创建数据表

// 留言/照片

const walls = `create table if not exists walls(
    id INT NOT NULL AUTO_INCREMENT,
    type INT NOT NULL COMMENT '类型0信息1图片',
    message VARCHAR(1000) COMMENT '留言', 
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    userId VARCHAR(100) NOT NULL COMMENT '创建者ID',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    label INT NOT NULL COMMENT '标签',
    color INT COMMENT '颜色',
    imgurl VARCHAR(100) COMMENT '图片路径',
    PRIMARY KEY ( id )
)`

// 留言反馈
const feedbacks =
    `create table if not exists feedbacks(
        id INT NOT NULL AUTO_INCREMENT,
        wallId INT NOT NULL COMMENT '墙留言ID', 
        userId VARCHAR(100) NOT NULL COMMENT '反馈者ID',
        type INT NOT NULL COMMENT ' 反馈类型0喜欢1举报2撤销',
        moment VARCHAR(100) NOT NULL COMMENT '时间',
        PRIMARY KEY ( id )
    ) `

// 留言评论
const comments =
    `create table if not exists comments(
        id INT NOT NULL AUTO_INCREMENT,
        wallId INT NOT NULL COMMENT '墙留言ID', 
        userId VARCHAR(100) NOT NULL COMMENT '评论者ID',
        imgurl VARCHAR(100) COMMENT '头像路径',
        comment VARCHAR(1000) COMMENT '评论内容',
        name VARCHAR(100) NOT NULL COMMENT '用户名',
        moment VARCHAR(100) NOT NULL COMMENT '时间',
       PRIMARY KEY ( id )
    ) `

// 创建表
const createTable = (sql) => {
    return query(sql, [])
}

// 先创建数据库，再创建表
async function create() {
    await createDatabase(wall);
    createTable(walls)
    createTable(feedbacks)
    createTable(comments)
}
create()


// 新建walls
exports.insertWall = (value) => {
    const _sql = 'insert into walls set type =?, message =?,name=?,userId=?,moment=?,label=?,color=?,imgurl=?;'
    return query(_sql, value)
}

// 新建反馈
exports.insertFeedback = (value) => {
    const _sql = 'insert into feedbacks set wallId=?, userId=?,type=?,moment=?;'
    return query(_sql, value)
}

// 新建评论
exports.insertComment = (value) => {
    const _sql = 'insert into comments set wallId =?, userId =?,imgurl=?,moment=?,comment=?,name=?;'
    return query(_sql, value)
}

// 删除墙，主表对应多条子表一起删除
exports.deleteWall = (id) => {
    const _sql =
        `delete a,b,c from walls a left join feedbacks b on a.id=b.wallId left join comments c on a.id=c.wallId where a.id='${id}';`
    return query(_sql)
}

// 删除反馈
exports.deleteFeedback = (id) => {
    const _sql = `delete from feedbacks where id="${id}";`
    return query(_sql)
}
// 删除评论
exports.deleteComment = (id) => {
    const _sql = `delete from comments where id="${id}";`
    return query(_sql)
}

// 分页查询
exports.findWallPage = (page, pagesize, type, label) => {
    let _sql;
    if (label == -1) {
        _sql = `select * from walls where type="${type}" order by id desc limit ${(page - 1) * pagesize},${pagesize}; `
    } else {
        _sql = `select * from walls where type="${type}" and label="${label}" order by id desc limit ${(page - 1) * pagesize},${pagesize};`
    }
    return query(_sql)
}
// 查询图片地址
// exports.findImgUrl = (id) => {

//     const _sql = `select imgurl from walls where id="${id}";`

//     return query(_sql)
// }
// 倒序分页查询的评论
exports.findCommentPage = (page, pagesize, id) => {
    const _sql = `select * from comments where wallId="${id}" order by id desc limit ${(page - 1) * pagesize},${pagesize};`
    return query(_sql)
}
// 查询各反馈总数据
exports.feedbackCount = (wid, type) => {
    const _sql = `select count(*) as count from feedbacks where wallId="${wid}" and type="${type}";`
    return query(_sql)
}

// 查询评论总数
exports.commentCount = (wid) => {
    const _sql = `select count(*) as count from comments where wallId="${wid}";`
    return query(_sql)
}
// 查询是否点赞
exports.likeCount = (wid, uid) => {
    const _sql = `select count(*) as count from feedbacks where wallId="${wid}" and userId="${uid}" and type=0;`
    return query(_sql)
}