const express = require('express');
const router= express.Router();
const Account=require('../db')
const mongoose = require('mongoose')
const authMiddleware =require('../middleware');

router.get('/balance',authMiddleware,async function(req, res){
    const account=await Account.FindOne({
        userId:req.user._id
    })

    res.json({
        balance:account.balance
    })
})

router.post('/transfer',authMiddleware,async function(req, res){
    const session=await mongoose.startSession()
    session.startTransaction()

    const {amount,to}=req.body

    const account=await Account.FindOne({
        userId:req.user._id
    }).session(session)

    if(!account || account.balance<amount){
        return res.status(400).json({
            msg:'Insufficient balance'
        })
    }

    const toAccount=await Account.FindOne({userId:to}).session(session)

    if(!toAccount){
        await session.abortTransaction()

        return res.status(400).json({
            msg:'Invalid recipient'
        })
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction()
    res.json({
        msg:'Transfer successful'
    })
})

module.exports=router
