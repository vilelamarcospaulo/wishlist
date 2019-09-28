module.exports = (router) => {
    router.get(`/`, ctx => {
        ctx.body = `Wishlist API!!`;
    })
}