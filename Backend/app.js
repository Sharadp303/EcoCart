const express = require("express")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser=require('cookie-parser')

require('dotenv').config()


const app=express()
app.use(express.json())
app.use(cookieParser())

require('./routes/products')(app);
require('./routes/auth')(app)
require('./routes/user')(app)
require('./routes/order')(app)


mongoose.connect(process.env.DB_URL).then((con)=>{
    console.log(`MongoDb Database Connected with HOST:${con?.connection?.host}`)
    //console.log("connected",con)
}).catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port: ${process.env.PORT} in ${process.env.NODE_ENV}`)
})