const express=require('express');
const port=8000;
const app=express();

// use routers
app.use("/",require('./routers/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Server Error ${err}`);
        return;
    }
    console.log('Server is running',port);
})