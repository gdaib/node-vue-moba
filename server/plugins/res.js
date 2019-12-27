const resPlugins = async (ctx, next) => {
  ctx.result = function(payload, message = "success", code = 0, status = 200) {
    ctx.status = status;
    ctx.body = {
      message,
      code,
      payload,
      success: true
    };
  };
  ctx.error = function(message, code = -1, status = 400) {
    ctx.status = status;
    ctx.body = {
      message,
      code,
      success: false
    };
  };
  await next();
};

export default resPlugins;
