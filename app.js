const Koa = require(`koa`);
const Router = require(`koa-router`);

const router = new Router()
const app = new Koa();

require(`./infrastructure/dbcollections`)(app) // REGISTER DBCOLLECTIONS TO APP CONTEXT
require(`./domain/client`)(app) // REGISTER DOMAINS TO APP CONTEXT

//INITIALIZE ROUTES
require(`./routes/index`)(router) 
require(`./routes/client`)(router)

app.use(router.routes())

let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
    console.log(`server running at ${server.address().address}:${server.address().port}`)
});