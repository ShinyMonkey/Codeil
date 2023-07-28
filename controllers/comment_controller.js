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


module.exports.distroyComment=function(req,res){
    Comment.findById(req.params.id).exec().then(function(comment){
        if(comment.user==req.user.id){
            comment.deleteOne()
            .then(function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
    
}