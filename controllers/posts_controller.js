const Post=require('../models/post');


module.exports.creatPost=function(req,res){
    console.log(req.body.content)
    Post.create({
        content:req.body.content,
        user:req.user._id,
    });
    return res.redirect('back')
}

