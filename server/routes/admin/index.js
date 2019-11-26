
import Router from "koa-router";
import inflection from 'inflection'

const router = new Router();


router.use('/rest/:resource', async (ctx, next) => {
  const modelName = inflection.classify(ctx.params.resource)
  const Model = require(`../../models/${modelName}`).default
  ctx.Model = Model;
  await next()
})


router.get('/rest/:resource', async (ctx, next) => {
  const payload = await ctx.Model.find().limit(10)
  ctx.body = {
    code: 0,
    payload
  }
})

router.get('/rest/:resource/:id', async (ctx, next) => {
  const payload = await ctx.Model.findById(ctx.params.id)
  ctx.body = {
    code: 0,
    payload
  }
})

router.put('/rest/:resource:/id', async (ctx, next) => {
  console.log('==============')
  const data = await ctx.Model.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body)
  ctx.body = {
    code: 0,
    msg: 'success',
    payload: true
  }
})

router.delete('/rest/:resource/:id', async (ctx, next) => {

})

router.post('/rest/:resource', async (ctx, nexg) => {

})

export default router