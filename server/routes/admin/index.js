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

router.get('/categoriesTree', async (ctx, next) => {
  
})

router.get("/categories", async (ctx, next) => {
  const list = await Category.find().limit(10)
  ctx.body = {
    code: 0,
    msg: "success",
    data: list
  };
});

router.delete('/categories/:id', async (ctx, next) => {
  try {
    await Category.findByIdAndDelete(ctx.params.id)
    ctx.body = {
      code: 0,
      msg: '删除成功'
    }
  } catch (error) {
    ctx.body = {
      code: 422,
      msg: '删除失败，id 不存在'
    }
  }
})

router.put('/categories/:id', async (ctx) => {
  try {
    await Category.updateOne({ _id: ctx.params.id }, ctx.request.body)
    ctx.body = {
      code: 0,
      msg: '修改成功'
    }
  } catch (error) {
    ctx.body = {
      code: 422,
      msg: '修改失败，id 不存在'
    }
  }
})

export default router;
