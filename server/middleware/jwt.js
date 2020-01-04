import jwt from "jsonwebtoken";
import config from "../config";

export default async function(ctx, next) {
  try {
    const token = ctx.header.authorization.replace("Bearer ", "");

    const user = jwt.verify(token, config.app_secret);
    ctx.query.user = user;
  } catch (err) {
    return ctx.error("token 已过期", -1, 401);
  }
  await next();
}
