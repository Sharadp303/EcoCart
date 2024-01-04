const { getProducts, newProduct, getProductDetails, updateProduct, deleteProduct } = require("../controllers/productControllers")
const { verifyToken, isAdmin } = require("../middlewares/auth")

module.exports=function(app){
    app.get('/api/products',getProducts)
    app.post('/api/products',[verifyToken,isAdmin],newProduct)
    app.get('/api/products/:id',getProductDetails)
    app.put('/api/products/:id',[verifyToken,isAdmin],updateProduct)
    app.delete('/api/products/:id',[verifyToken,isAdmin],deleteProduct)
}