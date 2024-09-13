const express = require ('express')
const userRouter=require('./user')
const accountRouter=require('./Account')
const router = express.Router()

router.use('/user',userRouter)
router.use('/account',accountRouter)

module.exports ={router}