const jsonwebtoken = require('jsonwebtoken');

module.exports = (router) => {
    router.post('/auth', ctx => {
        ctx.status = ctx.status = 401;
        if (ctx.request.header.token === process.env.AUTH_TOKEN_VALUE) {
            ctx.status = 200;
            ctx.body = {
              token: jsonwebtoken.sign({ role: 'adm' }, process.env.JWT_SECRET_VALUE),
            };
        }
        return ctx;
    })
}