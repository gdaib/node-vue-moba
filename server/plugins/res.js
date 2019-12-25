const resPlugins = async (ctx, next) => {

  ctx.result = function(message, payload, code = 0, status = 200) {
    ctx.status = status;
    ctx.body = {
      message,
      code,
      payload
    };
  };
  ctx.error = function(message, code = -1, status = 422) {
    ctx.status = status;
    ctx.body = {
      message,
      code
    };
  };
  await next();
};

export default resPlugins;
