const Router = require("koa-router");
const Multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");

const router = new Router();
const upload = new Multer();

router.get("/", async (ctx, next) => {
  ctx.body = 10;
});

router.get("/tpl", async (ctx, next) => {
  await ctx.render("index", {
    title: "pug template",
    isShowBaidu: 2,
    list: [
      { id: 1, text: "百度，一下就知道" },
      { id: 2, text: "天猫，天上的猫" },
      { id: 3, text: "京东，受惊的刘强东" },
      { id: 4, text: "阿里巴巴，阿里的爸爸" },
    ],
  });
});

router.get("/upload", async (ctx, next) => {
  await ctx.render("upload");
});

router.post("/api/upload", upload.single("logo"), async (ctx, next) => {
  let file = ctx.file;
  try {
    fs.writeFileSync(
      path.join(__dirname, `../public/upload/${file.originalname}`),
      file.buffer
    );
    ctx.body = "上传成功";
  } catch {
    ctx.body = "上传失败";
  }
});

module.exports = router;
