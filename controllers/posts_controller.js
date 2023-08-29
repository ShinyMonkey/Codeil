const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/likes');

module.exports.creatPost=async function(req,res){
    // console.log(req.body.content)
    try {
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id,
        });
        if(req.xhr){
            post=await post.populate('user','name');

            return res.status(200).json({
                data:{
                    post:post,
                },
                message: "Post Created"
            })
        }
        req.flash('success','Post Created Successfully');
        return res.redirect('back')
    } catch (error) {;
        console.log('Error',error);
        return;
    }
    
}


module.exports.distroyComment=async function(req,res){
    // Post.findById(req.params.id).exec().then(function(post){
    //     if(post.user==req.user.id){
    //         post.deleteOne();
    //         Comment.deleteMany({post:req.params.id}).exec().then(function(err){
    //             return res.redirect('back');
    //         });
           
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
    try {
        let post=await Post.findById(req.params.id);
        console.log(req.params.id)
        // console.log(post);
        if(post.user==req.user.id){
            await Like.deleteMany({likeable:post._id, onModel:'Post'});
            await Like.deleteMany({likeable:{$in:post.comments}});
            // await Like.deleteMany({_id: {$in: post.comments}});
            // console.log(o, "uhwei");

            post.deleteOne();
            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){

                
                return res.status(200).json({
                    data:{
                        post_id:req.params.id,
                    },
                    message: "Post Deleted",
                });
            }
            req.flash('success','Post Deleted Successfully')

            

            return res.redirect('back');
            
           
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
    }
    
}

