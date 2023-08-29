const passport=require('passport');
const googleOauthStrategy=require('passport-google-oauth').OAuth2Strategy;
const User=require('../models/user');
const crypto=require('crypto');
const env = require('./environment')

passport.use(new googleOauthStrategy({
    clientID: env.google_clientID,
    clientSecret: env.google_clientSecret,
    callbackURL: env.google_clientSecret,
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).then(function(user){
        console.log(profile);
        if(user){
            return done(null,user);
        }else{
            User.create({
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