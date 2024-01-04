const mongoose=require('mongoose')
const {data}=require('./data.js')
const Product =require('../models/products.js')
require('dotenv').config()

const seedProducts=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)

        await Product.deleteMany();
        console.log("Products are deleted")

        await Product.insertMany(data);
        console.log("Products are added")

        process.exit();
    }
    catch(error){
        console.log(error)
        process.exit();
    }
}

seedProducts();