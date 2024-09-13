const express = require ('express')
const zod=require('zod')
const router=express.Router()
const {User,Account} = require('../db')
const jwt=require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const signupbody=zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

router.post('/signup', async(req,res) => {
    const {success}=signupbody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser=await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({message: "Email already taken"})
    }

    const user=await  User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })

    const userId=user._id

    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })

    const token=jwt.sign({userId},JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })

})

const signinBody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post('/signin',async(req,res)=>{
    const {success}=signinBody.safeParse(req.body)

    if(!success){
        return res.status(411).json({message: "Incorrect inputs"})
    }

    const existingUser=await User.findOne({username:req.body.username,
        password:req.body.password
    })

    if(!existingUser || existingUser.password!==req.body.password){
        return res.status(401).json({message: "Invalid credentials"})
    }

    const user=await User.findOne({
        username: req.body.username,
        password:req.body.password
    })

    if(user){
        const token=jwt.sign({
            userId:user._id
        }, JWT_SECRET)

        res.json({
            message: "User signed in successfully",
            token: token
        })
    }

    res.status(411).json({message: "Invalid credentials"})
 
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || ""

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})



module.exports =router