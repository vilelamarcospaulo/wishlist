const errCodeMapToHTTPCode = err => 
    err.code === 'INVALID_FIELD' ? 400 :
    err.code === 'INVALID_EMAIL' ? 412 :
    err.code === 'INVALID_PRODUCT' ? 412 :
    500

const defaultCrudExecutor = async (ctx, f) => {
    try {
        let result = await f(ctx.params.id, ctx.request.body)
        ctx.body = result
        ctx.status = result ? 200 : 404
    } catch(err) {
        console.error(err)
        ctx.status = errCodeMapToHTTPCode(err)
        ctx.body = {
            code: err.code || 'UNKNOW',
            errorMessage: err.msg || 'Internal server error',
        }
    }
}

module.exports = defaultCrudExecutor