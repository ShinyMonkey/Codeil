const passport=require('passport');

const JwtStrategy=require('passport-jwt').Strategy;

const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require('../models/user');


const opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Codeil',
}

passport.use(new JwtStrategy(opts,function(JwtPayLoad,done){
    User.findById(JwtPayLoad._id).then(function(user){
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
}));


module.exports=passport;