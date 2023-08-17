const nodemailer = require('../config/nodemailer');

exports.newAccessToken= (resetObj)=>{
    console.log("Inside-Mailer");
    let htmlStriing=nodemailer.renderTemplet({resetObj:resetObj},'/accesstokenMailer/accesstokenMailer.ejs');
    nodemailer.transporter.sendMail({
        from:'Codeil.in',
        to: resetObj.user.email,
        subject:"Reset Password",
        html:htmlStriing,
    },(err,info)=>{
        if(err){
            console.log('Error while creating email', err);
            return;
        }
        console.log(info);
        return;
    })
}