const Product =require('../models/products.js')
const {search,filters,pagination} =require('../utils/apiFilters.js')


//Get all Product   =>  /api/products
async function getProducts(req,res){
    try{
        const resPerPage = 4;

        // Initialize the query using the search and filters functions
        let productsQuery = search(Product, req.query);
        productsQuery = filters(productsQuery, req.query);

        // Execute the query to get products and count
        let products = await productsQuery;
        const filteredProductsCount = products.length;

        // Create a paginated query and execute it
        const paginatedQuery = pagination(productsQuery.clone(), req.query, resPerPage);
        products = await paginatedQuery;

        // Send the response with the results
        res.status(200).json({
            resPerPage,
            filteredProductsCount,
            products,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}



// Create new Product   =>  /api/products
async function newProduct(req,res){
    try{
         req.body.user = req.user._id
        const product= await Product.create(req.body)
        res.status(201).json({product})    
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}


// Get single product details   =>  /api/products/:id
async function getProductDetails(req,res){
    try{
        const product= await Product.findById(req?.params?.id)
        if(!product){
            return res.status(404).json({
                error:"Product not found"
            })
        }
        res.status(200).json({product})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}

// Update product details   =>  /api/products/:id
async function updateProduct(req,res){
    try{
        const product= await Product.findByIdAndUpdate(req?.params?.id,req.body,{new:true})
        if(!product){
            return res.status(404).json({
                error:"Product not found"
            })
        }
        res.status(200).json({product})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}


// Delete product details   =>  /api/products/:id
async function deleteProduct(req,res){
    try{
        const product= await Product.findById(req?.params?.id)
        if(!product){
            return res.status(404).json({
                error:"Product not found"
            })
        }
        await product.deleteOne();

        res.status(200).json({
            message: "Product Deleted",
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}


module.exports ={getProducts,getProductDetails,newProduct,updateProduct,deleteProduct}