const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.creatPost=function(req,res){
    console.log(req.body.content)
    Post.create({
        content:req.body.content,
        user:req.user._id,
    });
    return res.redirect('back')
}


module.exports.distroyComment=function(req,res){
    Post.findById(req.params.id).exec().then(function(post){
        if(post.user==req.user.id){
            post.deleteOne();
            Comment.deleteMany({post:req.params.id}).exec().then(function(err){
                return res.redirect('back');
            });
           
        }else{
            return res.redirect('back');
        }
    })
}

