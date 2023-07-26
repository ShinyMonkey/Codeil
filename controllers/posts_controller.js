const Post=require('../models/post');


module.exports.creatPost=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id,
    });
    return res.redirect('back')
}

