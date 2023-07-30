const User=require('../models/user');
const passport=require("passport");

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
            await User.findByIdAndUpdate(req.params.id,req.body)
                return res.redirect('back');
        }else{
            res.status(404).send("Anauthorized Access")
        }
    } catch (error) {
        console.log('Error',error);
        return;
    }
    
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
    return res.redirect('/');
}


module.exports.deleteSession=function(req,res){
    req.logout(function(err){
        if (err) { return next(err);}
        console.log(err);
        return;
    });
    return res.redirect('/');
}


