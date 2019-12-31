import jwt from 'jsonwebtoken';
import config from '../config'

export default async function(ctx, next) {
  try {
  const user = jwt.verify(ctx.header["X-Token"], config.app_secret);
  ctx.query.user = user;
  console.log(user, 'hello world')
  } catch(err) {
    return ctx.error('token 已过期', -1, 401)
  }
  await next();
}