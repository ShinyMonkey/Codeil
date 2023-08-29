const fs=require('fs');
const path=require('path');
const rfs= require('rotating-file-stream');


const log_directory= path.join(__dirname,'../production_log');
fs.existsSync(log_directory) || fs.mkdirSync(log_directory);

const accesslogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: log_directory,
});


const development={
    name:'development',
    asset_path:'./public/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeil_development',
    smtp: {
        hoste:'smtp.google.com',
        service: 'gmail',
        port:587,
        secure:false,
        auth:{
            user: 'sensekoro449@gmail.com',
            pass: 'rgvlcxozmwuziesp',
        },
    },
    google_clientID: "1004932098765-73cf2bsfcge6kvn5gt6lk3v4rk34c9rg.apps.googleusercontent.com",
    google_clientSecret: "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",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_key: 'Codeil',
    morgan:{
        mode: 'dev',
        options:{stream:accesslogStream},
    }
}


const production={
    name:'production',
    asset_path: process.env.CODEIL_ASSETS_PATH,
    session_cookie_key: process.env.CODEIL_SESSION_COOKIE_KEY,
    db: process.env.CODEIL_DB,
    smtp: {
        hoste:'smtp.google.com',
        service: 'gmail',
        port:587,
        secure:false,
        auth:{
            user: process.env.CODEIL_USER,
            pass: process.env.CODEIL_USER_PASS,
            // pass: 'rgvlcxozmwuziesp',
        },
    },
    google_clientID: process.env.CODEIL_GOOGLE_CLIENTID,
    google_clientSecret: process.env.CODEIL_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.CODEIL_GOOGLE_CALL_BACK,
    jwt_key: process.env.CODEIL_JWT_KEY,
    morgan:{
        mode: 'combined',
        options:{stream:accesslogStream},
    }
    
}

module.exports=eval(process.env.CODEIL_ENVIRONMENT) == undefined ? development:eval(process.env.CODEIL_ENVIRONMENT);

