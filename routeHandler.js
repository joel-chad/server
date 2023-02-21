const productRoutes = require("./Product/route")
const userRouter = require('./routers/user')
const itemRouter =require('./routers/item')
const cartRouter = require('./routers/cart')
const orderRouter = require('./routers/order')

module.exports = app => {
    app.use("/product", productRoutes);
    app.use(userRouter)
    app.use(itemRouter)
    app.use(cartRouter)
    app.use(orderRouter)

}