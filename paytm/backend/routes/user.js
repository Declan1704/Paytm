const express=require('express');
const router=express.Router();
const z=require('zod');
const  validateUser=require('../middleware/userValidate');
const {User,Account}=require('../models/db')
const {userRegSchema,userLogin}=require('../models/zod_schema');
const jwt = require('jsonwebtoken');
const userJWT=require("../middleware/userAuth");
const JWT_SECRET="declanisgreat"

router.post("/registration",validateUser(userRegSchema),async (req,res)=>{
    try{
        const isValid=await User.find({name:req.body.name,
                                                    email:req.body.email,
                                                    password:req.body.password
        })
        console.log(isValid);
        if(!isValid){
            res.status(400).json({message:"User already exists"})
        }
        const user=await User.create({name:req.body.name,email:req.body.email,password:req.body.password});
        console.log(user);
        const userId=user._id
        const token=jwt.sign({userId},JWT_SECRET);
        await Account.create({
            userId,
            balance:1+Math.random()*10000
        })
        return res.status(200).json({
            message:"User Registered",
            token:token
        })
    }catch(e){
        res.status(500).json({message:"An unexpected error has occoured",error:e})
        console.log(e);
    }
})

router.post("/login",validateUser(userLogin),async (req,res)=>{
    try{
        const isValid=await User.findOne({email:req.body.email,password:req.body.password});
        if(isValid){
            return res.status(200).json({message:"Welcome"})
        
        }
        return res.status(400).json({message:"User does not exist"})
    }catch(error){
        res.status(500).json({message:"An unexpected error occoured"})
    }
})

const updateSchema=z.object({
    password:z.string().optional(),
    name:z.string().optional()
})
router.put("/update",userJWT,async (req,res)=>{
    try{
        const success=updateSchema.safeParse(req.body);
        if(!success){
            res.status(411).json({message:"Error while updating the info"})
        }
        await User.updateOne({
            _id:req.userId
        },{
            $set:req.body
        })
        res.json({message:"Updated User"});
    }catch(e){
        res.status(400).json({message:"An unexpected error has occoured"})
    }
})

router.get("/bulk",async (req,res)=>{
    const filter=req.query.filter||"";
    const users=await User.find({
        $or:[{
            name:{
                "$regex":filter
            }
        }]
    })
    res.json({
        user:users.map(user=>({
            name:user.name,
            email:user.email,
            password:user.password,
            _id:user._id
        }))
    })
})

module.exports=router;