const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs')
const env = require('./environment');
const transporter=nodemailer.createTransport(env.smtp);


const renderTemplet= (data,relativePath)=>{
    let mailerTemplete;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
    data,
    function(err,templet){
        if(err){
            console.log("error while rendering template",err);
            return;
        }
        mailerTemplete=templet;
    }
    );
    return mailerTemplete;
    
};


module.exports={
    transporter:transporter,
    renderTemplet:renderTemplet,
}