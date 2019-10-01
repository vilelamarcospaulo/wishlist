const executor = require('./executor')

module.exports = router => {
    router.get('/client/', ctx => executor(ctx, ctx.app.domains.client.listClients))
    router.get('/client/:id/', ctx => executor(ctx, ctx.app.domains.client.findClient))
    router.delete('/client/:id/', ctx => executor(ctx, ctx.app.domains.client.deleteClient))
    
    router.post('/client/', ctx => executor(ctx, (_, body) => ctx.app.domains.client.createClient(body)))
    router.put('/client/:id/', ctx => executor(ctx, ctx.app.domains.client.updateClient))

    router.post('/client/:id/product/', ctx => executor(ctx, (id, body) => ctx.app.domains.wishList.addProduct(id, body.productId))) 
    router.delete('/client/:id/product/:productId', ctx => executor(ctx, _ => ctx.app.domains.wishList.removeProduct(ctx.params.id, ctx.params.productId)))
}