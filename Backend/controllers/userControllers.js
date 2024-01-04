const User= require('../models/user.js')
const bcrypt=require('bcrypt')


async function getUserProfile(req,res){
    try{
        console.log(req.user)
        const user= await User.findById(req?.user?._id)
        res.status(200).json({user})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
}

async function updatePassword(req, res,)  {
   try{
        const user = await User.findById(req?.user?._id).select("+password");
    
        // Check the previous user password
        const isPasswordMatched =await bcrypt.compare(req.body.oldPassword,user.password)
    
        if (!isPasswordMatched) {
            return res.status(401).json({error:"Old Password is incorrect"});
        }
    
        user.password = await bcrypt.hash(req.body.password,10);
        user.save();
    
        res.status(200).json({
        success: true,
        });

   }
   catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
   }
  };

 async function updateProfile(req, res) {
    try{
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
          };
        
          const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
            new: true,
          });
        
          res.status(200).json({
            user,
          });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
  };


  // Get all Users - ADMIN  =>
  async function allUsers(req,res){
    try{
        const users = await User.find();

        res.status(200).json({
            users,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
  }

  // Get User Details - ADMIN  => 
  async function getUserDetails(req,res){
    try{
        const user = await User.findById(req.params.id);

        if(!user){
        return res.status(404).json({error:`User not found with id: ${req.params.id}`})
        }
        
        res.status(200).json({
            user,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
  }

  // Update User Details - ADMIN  => 
  async function updateUser(req, res)  {
   try{
     const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      };
    
      const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
      });
    
      res.status(200).json({
        user,
      });
   }
   catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
   }
  };
  
  // Delete User - ADMIN  =>  
  async function deleteUser(req, res){
    try{
        const user = await User.findById(req.params.id);
  
        if(!user){
            return res.status(404).json({error:`User not found with id: ${req.params.id}`})
        }
    
        // TODO - Remove user avatar from cloudinary
    
        await user.deleteOne();
    
        res.status(200).json({
        success: true,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error?.message})
    }
  };


module.exports={getUserProfile,updatePassword,updateProfile,allUsers,getUserDetails,allUsers,updateUser,deleteUser}