const defaultClientExecutor = async (ctx, f) => {
    try {
        let result = await f(ctx.params.id, ctx.request.body)
        ctx.body = result
        ctx.status = result ? 200 : 404
    } catch(err) {
        console.error(err)
        ctx.status = 500
        ctx.body = {
            code: err.code || 'UNKNOW',
            errorMessage: err.msg || 'Internal server error',
        }
    }   
}

module.exports = (router) => {
    router.get('/client/', ctx => defaultClientExecutor(ctx, ctx.app.domain.client.listClients))
    router.get('/client/:id/', ctx => defaultClientExecutor(ctx, ctx.app.domain.client.findClient))
    router.delete('/client/:id/', ctx => defaultClientExecutor(ctx, ctx.app.domain.client.deleteClient))
    
    router.post('/client/', ctx => defaultClientExecutor(ctx, (_, body) => ctx.app.domain.client.createClient(body)))
    router.put('/client/:id/', ctx => defaultClientExecutor(ctx, ctx.app.domain.client.updateClient))

    router.post('/client/:id/product/', ctx => defaultClientExecutor(ctx, (id, body) => ctx.app.domain.wishList.addProduct(id, body.productId))) 
    router.delete('/client/:id/product/:productId', ctx => defaultClientExecutor(ctx, _ => ctx.app.domain.wishList.removeProduct(ctx.params.id, ctx.params.productId)))
}