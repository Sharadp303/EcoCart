const { getUserProfile, updatePassword, updateProfile, allUsers, getUserDetails, updateUser, deleteUser } = require("../controllers/userControllers")
const { verifyToken, isAdmin } = require("../middlewares/auth")

module.exports=function(app){
    app.get('/me',[verifyToken],getUserProfile)
    app.put('/password/update',[verifyToken],updatePassword)
    app.put('/me/update',[verifyToken],updateProfile)

    app.get('/admin/users',[verifyToken,isAdmin],allUsers)
    app.get('/admin/users/:id',[verifyToken,isAdmin],getUserDetails)
    app.put('/admin/users/:id',[verifyToken,isAdmin],updateUser)
    app.delete('/admin/users/:id',[verifyToken,isAdmin],deleteUser)
}