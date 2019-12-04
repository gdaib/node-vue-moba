import Router from "koa-router";
import multer from 'koa-multer'
const router = new Router();
import { uploadFile } from '../../utils'

// { dest: './uploads/' }
const storage = multer.memoryStorage()
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (ctx, next) => {
  const url = await uploadFile(ctx.req.file);
  
  ctx.body = {
    code: 0,
    payload: url
  };
})

export default router