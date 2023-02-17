module.exports = function (app) {
    app.get('/test', (req, res) => {
        res.type('html')
        res.send("<h1>您访问的地址已被外星人劫持！</h1>")

    })
}