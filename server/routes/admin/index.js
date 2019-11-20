import Category from "../../models/Category";

import Router from "koa-router";

const router = new Router();

router.post("/categories", async (ctx, next) => {
  console.log(ctx.query, ctx)
  // const model = await Category.create(ctx.body);
  ctx.body = '1'
  return
  ctx.body = {
    data: model,
    code: 0,
    msg: "success"
  };
});

router.get("/categories", async (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: "success"
  };
});

export default router;
