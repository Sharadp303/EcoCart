const User = require("../models/user")
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
const {getResetPasswordTemplate}= require('../utils/emailTemplates.js')
const {sendEmail} =require('../utils/sendEmail.js')
const crypto = require('crypto')


async function registerUser(req,res){
    try{
        const {name,email,password}=req.body
        if(!email || !password || !name){
            return res.status(400).json({error:"Please enter name, email and password"})
        }
        if(password.length<=6){
            return res.status(400).json({error:"Your password must be longer than 6 characters"})
        }

        const hashPassword =await bcrypt.hash(password,10)
        const user=await User.create({
            name,email,password:hashPassword
        })


        res.status(201).json({success:true})

    }
    catch(error){
        console.log(error)
        if (error.code === 11000) {
            const message = `Duplicate ${Object.keys(error.keyValue)} entered.`;
            error.message=message;
          }
        res.status(500).json({error:error.message})
    }

}


async function loginUser(req,res){
    try{
        const {email,password}=req.body;
        
        if(!email || !password){
            return res.status(400).json({error:"Please enter email and password"})
        }

        const user =await User.findOne({email}).select("+password")

        if(!user){
            return res.status(401).json({error:"Invalid email or password"});
        }
        
        const validPass=await bcrypt.compare(password,user.password)
        if(!validPass){
            return res.status(401).json({error:"Invalid Username and password"})
        }

        const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_TIME})

        res.cookie("token",token,{
            expires:new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
            httpOnly:true,
        })
        res.status(200).json({token,})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error.message})
    }

}


async function logout(req,res){
    try{
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
          });
        
          res.status(200).json({
            message: "Logged Out",
          });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error.message})
    }
}


async function forgotPassword(req,res){
    
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({error:"User not found with this email"});
    }

    //Create reset Password token
    const resetToken= crypto.randomBytes(20).toString("hex");

    //Hash and set to resetPasswordToken Field
    user.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordExpire=Date.now() + 30 * 60 * 1000;

    await user.save();

    // Create reset password url

    const resetUrl=`${process.env.FRONTEND_URL}/api/password/reset/${resetToken}`

    const message=getResetPasswordTemplate(user?.name,resetUrl);

    try{
        await sendEmail({
            email:user.email,
            subject:"ShopIT Password Recovery",
            message,
        });
        
        res.status(200).json({
            message: `Email sent to: ${user.email}`, 
        });

    }
    catch(error){
        console.log(error)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return res.status(500).json({error:error?.message})
    }
    
}

async function resetPassword(req,res){
    
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })

    if(!user){
        return res.status(400).json({error:"Password reset token is invalid or has been expired"})
    }

    if(req.body.password!==req.body.confirmPassword){
        return res.status(400).json({error:"Password does not match"})
    }

    //Set the Password

    user.password = await bcrypt.hash(req.body.password,10);

    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    
  res.status(200).json({
    message:"Password Changed Successfully"
  });
}


module.exports={registerUser,loginUser,logout,forgotPassword,resetPassword}