const jwt=require('jsonwebtoken');
const JWT_SECRET=require('./config')

function authMiddleware(req,res,next){
    const authHeader=req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"unauthorized"})
    }

    const token=authHeader.split(" ")[1]
    
    try {
        const decoded=jwt.verify(token,JWT_SECRET)

        req.userId=decoded.userId
        next()
    } catch (error) {
        return res.status(403).json({
            message:"invalid token"
        })
    }
}

module.exports=authMiddleware;