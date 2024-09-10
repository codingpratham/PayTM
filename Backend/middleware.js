const {JWT_SECRET} =require('./config')
const jwt=require("jsonwebtoken")

function authMiddleware(req,res,next){
    const authHeader=req.headers.authorization
    if(!authHeader){
        return res.status(401).json({msg:"No token provided"})
    }

    const token=authHeader.split(" ")[1]

    try {
        const decoded=jwt.verify(token,JWT_SECRET)

        req.userId=decoded.userId
    } catch (error) {
        return res.status(411).json({msg:"wrong"})
    }
}

module.exports = {authMiddleware}