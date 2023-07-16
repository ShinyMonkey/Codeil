const express=require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose')

app.use(expressLayouts);
app.use(express.static('./assets'))

//extract script and style for sub folders
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
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
    console.log('Server is running',port);
})