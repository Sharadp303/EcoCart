const Product =require('../models/products')

async function createProductReview(req,res){
    try{

    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}
async function updateProductReview(req,res){
    try{

    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}

module.exports={createProductReview,updateProductReview}