const z=require('zod');

const userRegSchema=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6)
})

const userLogin=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

module.exports={userRegSchema,userLogin}