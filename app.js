const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');

const router = new Router()
const app = new Koa();

(async () => {
    await require('./infrastructure/dbcollections')(app); // REGISTER DBCOLLECTIONS 

    // REGISTER INTEGRATION
    app.integration = {}
    require('./integration/product')(app)


     // REGISTER DOMAINS
    app.domain = {}
    require('./domain/client')(app)
    require('./domain/clientWishlist')(app)
})()

//INITIALIZE ROUTES
require('./routes/index')(router) 
require('./routes/client')(router)

app.use(BodyParser())
app.use(router.routes())

let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
    console.log(`server running at ${server.address().address}:${server.address().port}`)
});

module.exports = server