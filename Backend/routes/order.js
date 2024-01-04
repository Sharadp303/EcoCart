const { newOrder, getOrderDetails, myOrders, allOrders, updateOrder, deleteOrder } = require("../controllers/orderController")
const { verifyToken, isAdmin } = require("../middlewares/auth")

module.exports=function(app){
    app.post('/order/new',[verifyToken],newOrder)
    app.get('/order/:id',[verifyToken],getOrderDetails)
    app.get('/me/orders',[verifyToken],myOrders)

    app.get('/admin/orders',[verifyToken,isAdmin],allOrders)
    app.put('/admin/orders/:id',[verifyToken,isAdmin],updateOrder)
    app.delete('/admin/orders/:id',[verifyToken,isAdmin],deleteOrder)

}