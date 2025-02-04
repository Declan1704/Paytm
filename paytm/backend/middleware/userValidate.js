const z=require("zod")
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body)
        return next()
    } catch (error) {
        if(error instanceof z.ZodError){
            return res.status(400).json(error.errors)
        }
        return res.status(500).json({message:"Internal server error"})
    }
}

module.exports=validate;