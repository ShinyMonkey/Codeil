const passport=require('passport');
const googleOauthStrategy=require('passport-google-oauth').OAuth2Strategy;
const User=require('../models/user');
const crypto=require('crypto');


passport.use(new googleOauthStrategy({
    clientID: "1004932098765-73cf2bsfcge6kvn5gt6lk3v4rk34c9rg.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).then(function(user){
        console.log(profile);
        if(user){
            return done(null,user);
        }else{
            User.creat({
                name:profile.name,
                email:progile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex'),
            }).then(function(user){
                    return done(null,user);
            })
        }
    })
}
))


module.exports=passport;