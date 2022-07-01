const {createProxMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "api",
        createProxMiddleware({
            target: "http://7zone.co.kr:5000",
            changeOrigin: true
        })
    )
}