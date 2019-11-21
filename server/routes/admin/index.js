import Category from "../../models/Category";

import Router from "koa-router";

const router = new Router();

router.post("/categories", async (ctx, next) => {

  const model = await Category.create(ctx.request.body);

  ctx.body = {
    data: model,
    code: 0,
    msg: "success"
  };
});

router.get("/categories", async (ctx, next) => {
  const list = await Category.find().limit(10)
  ctx.body = {
    code: 0,
    msg: "success",
    data: list
  };
});

export default router;
