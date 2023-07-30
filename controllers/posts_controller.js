const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.creatPost=async function(req,res){
    // console.log(req.body.content)
    try {
        await Post.create({
            content:req.body.content,
            user:req.user._id,
        });
        return res.redirect('back')
    } catch (error) {
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
        if(post.user==req.user.id){
            post.deleteOne();
            await Comment.deleteMany({post:req.params.id});

            return res.redirect('back');
            
           
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error',error);
        return;
    }
    
}

