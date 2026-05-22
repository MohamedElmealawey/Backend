const jwt=require("jsonwebtoken");

exports.AdminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        
        if(!email || !password){
            return res.json({
                success:false,
                message:"Inputs must be fill"
            })
        }else{
            if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){
                const token=await jwt.sign({email},process.env.TOKEN_PASS);

                return res.status(200).send({
                    success:true,
                    message:"Login Success",
                    token
                })
            }else{
                return res.status(400).send({
                    success:false,
                    message:"Invalid Credintails"
                })
            }
        }
    }catch(error){
        console.log(error.message)
    }
}