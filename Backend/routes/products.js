const { getProducts, newProduct, getProductDetails, updateProduct, deleteProduct } = require("../controllers/productControllers")
const { verifyToken, isAdmin } = require("../middlewares/auth")

module.exports=function(app){
    app.get('/products',getProducts)
    app.post('/products',[verifyToken,isAdmin],newProduct)
    app.get('/products/:id',getProductDetails)
    app.put('/products/:id',[verifyToken,isAdmin],updateProduct)
    app.delete('/products/:id',[verifyToken,isAdmin],deleteProduct)
}