const koa = require('koa')
const middleware = require('./middleware')
const { port } = require('./config/app')
const app = new koa()

app.context.global = '全局好玩de'

middleware(app)

app.listen(port)

console.log(`已启用服务，当前端口为${port}`)
