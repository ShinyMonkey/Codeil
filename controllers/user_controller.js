const User=require('../models/user');
const passport=require("passport");
const fs=require('fs');
const path=require('path');
const Reset=require('../models/forget_passpowrd_tokem');
const mailer=require('../mailer/access_token_mailer');
const crypto=require('crypto');

module.exports.profile=async function(req,res){
    try {
        let user=await User.findById(req.params.id);
        return res.render('user_profile',{
            title:'Codel_profile',
            header:'COdeil Profile',
            profile_user:user,
        })
    } catch (error) {
        console.log('Error',error);
        return;
    }
    
   
}

module.exports.update= async function(req,res){
    try {
        if(req.user.id==req.params.id){
            let user=await User.findById(req.params.id)
            User.uploadAvatar(req,res,function(err){
                if(err){console.log("******Multer Error********",err)};
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    // let f=user.avatar
                    if(user.avatar ){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarPath + '/'+ req.file.filename;
                }
                // console.log(user);
                // console.log(req.file);
                user.save();
                return res.redirect('back');
            })
                // return res.redirect('back');
        }else{
            res.status(404).send("Anauthorized Access")
        }
    } catch (error) {
        console.log('Error',error);
        return;
    }
    // try {
    //     if(req.user.id==req.params.id){
    //         await User.findByIdAndUpdate(req.params.id,req.body)
    //             return res.redirect('back');
    //     }else{
    //         res.status(404).send("Anauthorized Access")
    //     }
    // } catch (error) {
    //     console.log('Error',error);
    //     return;
    // }
    
    // res.render("user_profile",{
    //     title:'Codel_profile',
    //     header:'Profile',
    // });
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title:'Codel-Signin',
        header:'Creat-account',
    });
}


module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title:'Codel-Sign-up',
        header:'login',
    });
}
module.exports.create=async function(req,res){
    // console.log(req.body);
    try {
        if(req.body.password != req.body.Confirm_password){
            return res.redirect('back');
        }
        let user=await User.findOne({email:req.body.email});
            // if(err){
            //     console.log('Error not found');
            //     return;
            // }
            if(!user){
                User.create(req.body);    
                return res.redirect('/users/signup');
            }else{
                return res.redirect('back');
            }
        // return res.redirect('back');
    } catch (error) {
        console.log('Error',error);
        return;
    }
   
}

module.exports.creatSessions=function(req,res){
    // User.findOne({email:req.body.email}).exec().then(function(user){
    //     if(user){
    //         console.log(user.password,req.body.password)
    //         if(user.password!=req.body.password){
    //             return res.redirect('back');
    //         }
    //         res.cookie('user_id',user.id)
    //         return res.redirect('/users/profile');
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
    req.flash('success','You Loged-in Successfully');
    return res.redirect('/');
}


module.exports.deleteSession=function(req,res){
    req.logout(function(err){
        if (err) { return next(err);
        }else{
            req.flash('success','You Loged-out Successfully');
            return res.redirect('/');
        }
        // console.log(err);
        
    });
    
    
};


module.exports.forget=function(req,res){
    return res.render('forget',{
        title: "Reset Password",
    })
}


module.exports.findmail=async function(req,res){
    try {
        let user=await User.findOne({email:req.body.email});
        if(user){
            let reset=await Reset.create({
                accesstoken: crypto.randomBytes(20).toString('hex'),
                is_valid:true,
                user:user._id,
            });
            console.log(reset);
            reset=await reset.populate('user','email');
            mailer.newAccessToken(reset);
            return res.redirect('back');
        }else{
            // return res.redirect('back');
        }
        

    } catch (error) {
        console.log('Error',error);
        return;
    }
    
}

module.exports.resetPasswordPage=async function(req,res){
    try {
        let reset=await Reset.findOne({accesstoken:req.params.accessToken})
    if(reset){
        // console.log(reset);
        return res.render('reset-pasword',{
            title:"Title-Reset page",
            reset:reset,
        })
    }else{
        return res.redirect('back');
    }
    } catch (error) {
        console.log('Error',error);
        return;
    }
    
    
}



module.exports.resetPassword=async function(req,res){
    try {
        if(req.body.password == req.body.confermPassword){
            let reset= await Reset.findOne({accesstoken:req.params.accessToken});
            if(reset.is_valid){
                let user= await User.findById(reset.user._id);
                if(user){
                    user.password=req.body.password;
                    user.save();
                }
                reset.is_valid=false;
                reset.save();
                return res.redirect('/');
            }else{
                console.log('Token expired');
                return res.redirect('back')
            }
        }else{
            console.log('password-mismatch')
            return res.redirect('back')
        }
        
    } catch (error) {
        console.log('Error',error);
        return;
    }
}