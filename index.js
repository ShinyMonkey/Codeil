const express=require('express');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
// const MongoStore=require('connect-mongo')(session);
const { default: mongoose } = require('mongoose');
const MongoStore = require('connect-mongo');
const flash=require('connect-flash');
const customMware=require('./config/middleware');





app.use(express.urlencoded());
app.use(expressLayouts);
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(express.static('./assets'))



//extract script and style for sub folders
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// authentaication for session
app.use(session({
    name:'codeil',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100),
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeil_development',
        autoRemove:'disabled',
    },{
        function(err){
            console.log(err || 'mongo-connect setup ok');
        }
    })
    
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticateUser);
app.use(flash());
app.use(customMware.setflash);
// use routers
app.use("/",require('./routers'));
app.set('view engine','ejs');
app.set('views','./views');
// app.use('/users', require('./routers/user'));

app.listen(port,function(err){
    if(err){
        console.log(`Server Error ${err}`);
        return;
    }
    console.log(__dirname+'/uploads');
    console.log('Server is running',port);
})