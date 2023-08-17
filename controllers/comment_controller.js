const Comment=require('../models/comment');
const Post=require('../models/post')
const mailer=require('../mailer/comments_mailer');
const queue=require('../config/kue');
const commentEmailWorker=require("../workers/comment_email_worker");

module.exports.create=async function(req,res){
    try {
        let post=await Post.findById(req.body.post);
        if(post){
            let comment=await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            });
            post.comments.push(comment);
                post.save();
            
                // console.log(comment.content);
                comment=await comment.populate('user', 'name email');
                // mailer.newComment(comment);
                let job=queue.create('emails',comment).save(function(err){
                    if(err){
                        console.log("Error while creating a job", err);
                        return;
                    }

                    console.log("job enqueued", job.id);
                })
                if(req.xhr){
                    
                    return res.status(200).json({
                        data:{
                            comment:comment,
                        },
                        message: 'Comment Created',
                    });
                }
                
                // post.comment.sort('-createdAt');
                req.flash('success','Comment Added Successfully')
                res.redirect('/');
            
        }
    } catch (error) {
        console.log('Error',error);
        return;
    }
    
}


module.exports.distroyComment=async function(req,res){
    try {
        let comment= await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let postId = comment.post;
            comment.deleteOne();
            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            // req.flash('success','Comment Deleted Successfully');
            console.log(req.xhr);
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id,
                    },
                    message:"Comment Deleted",
                })
            }
            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return;
    }
    
    
}