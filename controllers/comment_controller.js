const Comment=require('../models/comment');
const Post=require('../models/post')


module.exports.create=function(req,res){
    Post.findById(req.body.post).exec().then(function(post){
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            }).then(function(comment){
                console.log(comment.content);
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
}