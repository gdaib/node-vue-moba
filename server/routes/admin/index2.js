import Category from "../../models/Category";

import Router from "koa-router";

import { convertListToTree } from '../../utils'

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
  const data = await Category.find().lean() // 调用此方法，返回的就是 js 对象，而不是 mongoose doc（对象类型会被冻结）

  const tree = convertListToTree(data)

  ctx.body = {
    code: 0,
    data: tree,
    msg: 'success'
  }
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
