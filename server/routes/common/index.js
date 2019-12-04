import Router from "koa-router";
import multer from 'koa-multer'
const router = new Router();
import { uploadFile } from '../../utils'

// { dest: './uploads/' }
const upload = multer();

router.post('/upload', upload.single('file'), async (ctx, next) => {
  console.log(ctx.req.file)
  const { originalname: filename, buffer: file } = ctx.req.file

  const url = await uploadFile({ filename, file });
  
  ctx.body = {
    code: 0,
    payload: url
  };
})

export default router