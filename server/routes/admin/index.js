import Router from "koa-router";
import inflection from "inflection";
import { convertListToTree, jwtSign } from "../../utils";
import jwt from "../../middleware/jwt";

const router = new Router();

router.post("/user/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  // 1. 根据用户名找密码
  // 2. 校验密码
  // 3. 返回 token
  const AdminUser = require("../../models/AdminUser").default;
  const user = await AdminUser.findByUserName(username);

  if (!user) {
    return ctx.error("用户不存在", -1);
  }

  if (!(await user.validatePw(password))) {
    return ctx.error("用户名或密码错误", -1);
  }

  const token = jwtSign({
    id: user._id,
    _id: user._id,
    username: user.username
  });

  ctx.result({ token });
});

router.use(jwt);

router.get("/user/info", async (ctx, next) => {

  return ctx.result(ctx.query.user);
});


router.use("/rest/:resource", async (ctx, next) => {
  const modelName = inflection.classify(ctx.params.resource);
  const Model = require(`../../models/${modelName}`).default;
  ctx.Model = Model;
  await next();
});

router.get("/rest/:resource", async (ctx, next) => {
  let queryOptions = {};

  // 需要查出上级分类, populate 会查出关联的对象
  if (ctx.Model.modelName === "Category") {
    queryOptions.populate = "parent";
  }

  const { size, page = 1 } = ctx.query;

  const skip = size * (page - 1);

  const data = await ctx.Model.find()
    .setOptions(queryOptions)
    .limit(skip);

  const total = await ctx.Model.count();

  ctx.body = {
    code: 0,
    payload: {
      data,
      total
    }
  };
});

router.post("/rest/:resource", async (ctx, nex) => {
  const payload = await ctx.Model.create(ctx.request.body);
  ctx.body = {
    code: 0,
    msg: "success",
    payload
  };
});

// 获取分类类目树
router.get("/rest/categories/tree", async (ctx, next) => {
  const data = await ctx.Model.find()
    .sort({ sort: 1 })
    .lean(); // 调用此方法，返回的就是 js 对象，而不是 mongoose doc（对象类型会被冻结）

  const tree = convertListToTree(data);

  ctx.body = {
    code: 0,
    payload: tree,
    msg: "success"
  };
});

router.post("/rest/categories/sort", async (ctx, next) => {
  const data = ctx.request.body;

  await Promise.all(
    data.map(data => ctx.Model.updateOne({ _id: data.id }, data))
  );

  ctx.body = {
    code: 0,
    payload: true,
    msg: "success"
  };
});

router.get("/rest/:resource/:id", async (ctx, next) => {
  const payload = await ctx.Model.findById(ctx.params.id);
  ctx.body = {
    code: 0,
    payload
  };
});

router.delete("/rest/:resource/:id", async (ctx, next) => {
  const ids = ctx.params.id.split(",");

  await ctx.Model.deleteMany({
    _id: {
      $in: ids
    }
  });

  ctx.body = {
    code: 0,
    payload: true,
    msg: "success"
  };
});

router.put("/rest/:resource/:id", async (ctx, next) => {
  await ctx.Model.updateOne({ _id: ctx.params.id }, ctx.request.body);
  ctx.body = {
    code: 0,
    msg: "success",
    payload: true
  };
});

export default router;
