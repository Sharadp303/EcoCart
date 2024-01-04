const User=require('../models/user')
const jwt= require('jsonwebtoken')

async function verifyToken(req,res,next){
    try{
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({error:"Login first to access this resource"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        next();

    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }

}

async function isAdmin(req,res,next){
    if(req.user.role!=="admin"){
        return res.status(403).json({error:`Role (${req.user.role}) is not allowed to access this resource`})
    }
    next();
}

module.exports ={verifyToken,isAdmin}