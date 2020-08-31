const Router = require('koa-router')
const Multer = require('@koa/multer')
const fs = require('fs')
const dayjs = require('dayjs')
const path = require('path')
const nodemailer = require('nodemailer')
const download = require('download')

const router = new Router()
const upload = new Multer()

router.get('/test', async (ctx, next) => {
  Object.keys(ctx).map((item) => {
    console.log(item)
  })
  ctx.body = `${ctx}`
})

router.get('/', async (ctx, next) => {
  ctx.redirect('http://127.0.0.1:8080')
})

router.get('/downloadImg', async (ctx, next) => {
  let rand1 = Math.floor(Math.random() * 1000)
  let rand2 = Math.floor(Math.random() * 10000)
  let rand3 = Math.floor(Math.random() * 100000)
  let timeUnixArr = dayjs().valueOf().toString().split('')
  timeUnixArr.splice(7, 1, rand2)
  let timeUnixStr = timeUnixArr.join('')
  let imgStr =
    rand1 + timeUnixStr + rand3 + '.' + ctx.query.imgUrl.split('.').pop()
  try {
    fs.writeFileSync(
      path.join(__dirname, `../public/favicon/${imgStr}`),
      await download(ctx.query.imgUrl)
    )
    ctx.body = `favicon/${imgStr}`
  } catch {
    ctx.body = '下载失败'
  }
})

router.get('/tpl', async (ctx, next) => {
  await ctx.render('index', {
    title: 'pug template',
    isShowBaidu: 2,
    list: [
      { id: 1, text: '百度，一下就知道' },
      { id: 2, text: '天猫，天上的猫' },
      { id: 3, text: '京东，受惊的刘强东' },
      { id: 4, text: '阿里巴巴，阿里的爸爸' },
    ],
  })
})

router.get('/upload', async (ctx, next) => {
  await ctx.render('upload')
})

router.post('/api/upload', upload.single('logo'), async (ctx, next) => {
  let file = ctx.file
  try {
    fs.writeFileSync(
      path.join(__dirname, `../public/upload/${file.originalname}`),
      file.buffer
    )
    ctx.body = '上传成功'
  } catch {
    ctx.body = '上传失败'
  }
})

router.get('/emailto', async (ctx, next) => {
  let index = 1
  var mailTransport = nodemailer.createTransport({
    port: '465',
    host: 'smtp.qq.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth: {
      user: '491623426@qq.com',
      pass: 'jtbjzvaozreqbhge',
    },
  })
  let options = {
    from: '"-v-" <491623426@qq.com>',
    to: '"我" <2904468131@qq.com>',
    html: `深圳富婆分布图地址:<a href="https://www.baidu.com">https://www.fupo.com</a><br/>第${index}次发送邮件！<br/>当前时间是${new Date()}`,
  }

  setInterval(function () {
    mailTransport.sendMail(options, (err) => {
      if (err) {
        console.log('发送邮件失败')
      } else {
        index++
        console.log('发送邮件成功')
      }
    })
  }, 5000)
})

module.exports = router
