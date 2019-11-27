
import Router from "koa-router";
import inflection from 'inflection'
import { convertListToTree } from '../../utils'

const router = new Router();

router.use('/rest/:resource', async (ctx, next) => {
  const modelName = inflection.classify(ctx.params.resource)
  const Model = require(`../../models/${modelName}`).default
  ctx.Model = Model;
  await next()
})


router.get('/rest/:resource', async (ctx, next) => {
  let queryOptions = {}

  // 需要查出上级分类, populate 会查出关联的对象
  if (ctx.Model.modelName === 'Category') {
    queryOptions.populate = 'parent'
  }

  const payload = await ctx.Model.find().setOptions(queryOptions).limit(10)
  ctx.body = {
    code: 0,
    payload
  }
})


router.post('/rest/:resource', async (ctx, nex) => {
  const payload = await ctx.Model.create(ctx.request.body)
  ctx.body = {
    code: 0,
    msg: 'success',
    payload
  }
})

// 获取分类类目树
router.get('/rest/categories/tree', async (ctx, next) => {
  const data = await ctx.Model.find().lean() // 调用此方法，返回的就是 js 对象，而不是 mongoose doc（对象类型会被冻结）

  const tree = convertListToTree(data)

  ctx.body = {
    code: 0,
    data: tree,
    msg: 'success'
  }
})


router.get('/rest/:resource/:id', async (ctx, next) => {
  const payload = await ctx.Model.findById(ctx.params.id)
  ctx.body = {
    code: 0,
    payload
  }
})


router.delete('/rest/:resource/:id', async (ctx, next) => {
  const ids = ctx.params.id.split(',')

  await ctx.Model.deleteMany({
    _id: {
      $in: ids
    }
  })

  ctx.body = {
    code: 0,
    payload: true,
    msg: 'success'
  }
})

router.put('/rest/:resource/:id', async (ctx, next) => {
  await ctx.Model.updateOne({ _id: ctx.params.id }, ctx.request.body)
  ctx.body = {
    code: 0,
    msg: 'success',
    payload: true
  }
})


export default router