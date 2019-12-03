import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";

import adminRouter from "./routes/admin";
import commonRouter from "./routes/common";
import db from "./plugins/db";

const app = new Koa();

app.use(bodyParser());
app.use(
  cors({
    allowMethods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

const router = new Router();

const apiPrefix = "/api/v1";
router.use(
  `${apiPrefix}/admin`,
  adminRouter.routes(),
  adminRouter.allowedMethods()
);
router.use(
  `${apiPrefix}/common`,
  commonRouter.routes(),
  commonRouter.allowedMethods()
);
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
