const jwt=require("jsonwebtoken");
const JWT_SECRET="declanisgreat"
const userAuth=(req,res,next)=>{
    try{
        const token=req.headers['authorization'];
        decoded=jwt.verify(token,JWT_SECRET);
        req.userId=decoded.userId;
        next();
    }catch(error){
        res.status(500).json({message:"unexpected error has occoured"})
        console.log(error);
    }
}

module.exports=userAuth;