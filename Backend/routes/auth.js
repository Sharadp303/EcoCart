const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require("../controllers/authControllers")

module.exports=function(app){
    app.post("/api/register",registerUser)
    app.post("/api/login",loginUser)
    app.get("/api/logout",logout)
    app.post("/api/password/forgot",forgotPassword)
    app.put("/api/password/reset/:token",resetPassword)
    
}