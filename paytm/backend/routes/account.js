const express=require('express');
const UserMid=require("../middleware/userAuth")
const router=express.Router();
const {Account}=require("../models/db");
const { default: mongoose } = require('mongoose');

router.get("/balance",UserMid,async (req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance
    })
})

router.post("/transfer",UserMid,async (req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();
    const {amount,to}=req.body;
    const account=await Account.findOne({userId:req.userId}).session(session);
    if(!account||account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({message:"Insufficient Balance"})
    }
    const toAccount=await Account.findOne({userId:to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({message:"Invalid account"})
    }
    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
    await session.commitTransaction();
    res.json({
        message:"Transfer successful"
    })
})
module.exports=router;