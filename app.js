const koa = require("koa");
const middleware = require("./middleware");
const { port } = require("./config/app");
const app = new koa();

middleware(app);

app.listen(port);