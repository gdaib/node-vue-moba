import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";

import adminRouter from "./routes/admin";
import db from "./plugins/db";

const app = new Koa();

app.use(cors({
  allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(bodyParser());

const router = new Router();

const apiPrefix = "/api/v1";
router.use("/admin/api/v1", adminRouter.routes(), adminRouter.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
