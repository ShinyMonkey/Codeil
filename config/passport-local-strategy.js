const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user')



passport.use(new LocalStrategy({
    usernameField:'email',
},function(email,password,done){
    User.findOne({email:email}).exec().then(function(user){
        // if(err){
        //     console.log('Error while finding the user');
        //     return done(err);
        // }
        if(!user || user.password!=password){
            console.log('User Not found');
            return done(null,false);
        }
        return done(null,user);
    });
}));

//serializer 
passport.serializeUser(function(user,done){
    return done(null,user.id);
})

//deserializer

passport.deserializeUser(function(id,done){
    User.findById(id).exec().then(function(user){
        return done(null,user);
    })
})



passport.checkAuthenticate=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signup');
}


passport.setAuthenticateUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}


module.exports=passport;