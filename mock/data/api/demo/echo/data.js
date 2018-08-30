module.exports = function(ctx) {
  const { data, count = 1 } = ctx.request.body;
  console.log(ctx.mock.utils.repeat(data, count))
  ctx.body = {
    code: 200,
    data: ctx.mock.utils.repeat(data, count),
    systemtime: Date.now()
  };
}