const express=require('express')
const zod=require('zod');
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require('../config');
const {User}=require('../db')
const router=express.Router()
const userSchema = zod.object({
    email:zod.string().email(),
    password:zod.string()
})

router.post('/signup',async(req,res)=>{
    const success= userSchema.safeParse(req.body)

    if(!success){
        return res.status(400).json({error:'Invalid input'})
    }

    const existinguser=User.findOne({email:req.body.email})

    if(existinguser){
        return res.status(400).json({error:'User already exists'})
    }
    const user=await User.create({
        email:req.body.email,
        password:req.body.password
    })

    const user_Id= user._id

    const token=jwt.sign({
        user_Id
    },jwt_secret)

    
    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})
router.post('/signin',async(req,res)=>{
    const success= signinBody.safeParse(req.body)
    if(!success){
        return res.status(400).json({error:'Invalid input'})
    }

    
    const user =await User.findOne({email:req.body.email,
        password:req.body.password
    })

    if(user){
        const token=jwt.sign({userid:user._id},JWT_SECRET)

        res.json({
            token:token
        })
        return
    }

    res.status(401).json({msg:"error"})

})

router.put('/j')

module.exports={router};