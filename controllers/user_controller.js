module.exports.profile=function(req,res){
    res.render("user_profile",{
        title:'Codel_profile',
        header:'header',
    });
}

module.exports.signin=function(req,res){
    return res.render('user_sign_in',{
        title:'Codel-Signin',
        header:'Creat-account',
    });
}


module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:'Codel-Sign-up',
        header:'login',
    });
}