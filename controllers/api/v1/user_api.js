const jwt=require('jsonwebtoken');
const User=require('../../../models/user');
const env= require('../../../config/environment');

module.exports.creatSessions= async function(req,res){
    try {
        let user=await User.findOne({email:req.body.email});
    if(!user || user.password!=req.body.password){
        return res.json(422,{
            message:"Invalid email or Passpord",
        });
    } 
    return res.json(200,{
        message:" Sing-in Succesfull",
        data:{
            token: jwt.sign(user.toJSON(),env.jwt_key,{
                expiresIn: '100000',
            })
        }
    })  
    } catch (error) {
        console.log(error,"****Error*******");
        return res.json(500,{
            message:"Invalid Server Error"
        });
    }
    
}