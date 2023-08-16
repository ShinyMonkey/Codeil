const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs')
const transporter=nodemailer.createTransport({
    hoste:'smtp.google.com',
    service: 'gmail',
    port:587,
    secure:false,
    auth:{
        user: 'sensekoro449@gmail.com',
        pass: 'rgvlcxozmwuziesp',
    },
});


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