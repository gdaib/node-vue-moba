import Router from "koa-router";
import multer from 'koa-multer'
const router = new Router();

// { dest: './uploads/' }
const upload = multer();

router.post('/upload', upload.single('file'), async (ctx, next) => {
  console.log(ctx.req.file)
  
  ctx.body = {
    code: 0
  }
})

export default router