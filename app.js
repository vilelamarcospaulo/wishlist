const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const jwt = require('./security/koajwt');

const app = new Koa();
const router = new Router();
const secureRouter = new Router();

require('./infrastructure/dbcollections')(app).then( _ => {
    app.integrations = {}
    require('./integration/product')(app)

    app.domains = {}
    require('./domain/client')(app)
    require('./domain/clientWishlist')(app)
})

//AUTH ROUTE
require('./routes/auth')(router);

//INITIALIZE ROUTES
secureRouter.use(jwt);
require('./routes/index')(secureRouter);
require('./routes/client')(secureRouter);

app.use(BodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(secureRouter.routes()).use(secureRouter.allowedMethods());

let port = process.env.PORT || 3000;
let server = app.listen(port, _ => {
    console.log(`server running at ${server.address().address}:${server.address().port}`)
});

module.exports = server