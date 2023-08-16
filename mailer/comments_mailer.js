const nodeMailer=require('../config/nodemailer');

exports.newComment= (comment)=>{
    console.log("Inside Mailer");
    let htmlMailer=nodeMailer.renderTemplet({comment:comment},'/commentMailer/comment.ejs')
    nodeMailer.transporter.sendMail({
        from:'Codeil.in',
        to:comment.user.email,
        subject:'A comment sent to your post',
        html:htmlMailer,
    },(err,info)=>{
        if(err){
            console.log("Error while sending mail",err);
            return;
        }
        console.log(info);
        return;
    })
}