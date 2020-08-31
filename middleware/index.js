const path = require('path')
const favicon = require('koa-favicon')
const serve = require('koa-static')
const bodyparser = require('koa-bodyparser')
const views = require('koa-views')
const router = require('../routes')

const middleware = (app) => {
  app.use(favicon(path.join(__dirname, '../public/favicon.ico')))
  app.use(serve(path.join(__dirname, '../public')))
  app.use(bodyparser())
  app.use(
    views(path.join(__dirname, '../views'), {
      extension: 'pug',
    })
  )
  app.use(router.routes(), router.allowedMethods())
}
module.exports = middleware
