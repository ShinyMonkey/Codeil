const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res){

    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user','-password')
    .populate({
        path:'comments',
        populate:{
            path:'user',
        }
    });


    return res.json(200,{
        message: "List of Posts",
        post:posts,
    })
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
        if(post.user==req.user.id){
            post.deleteOne();
            await Comment.deleteMany({post:req.params.id});
            return res.json(200,{
                message:"Post and assossiated comments Deleted",
            });
            
           
        }else{
            return res.json(401,{
                message: "You Cannot Delete This Post",
            })
        }
        
        
    } catch (error) {
        console.log('Biufhiuwhgi',error);
        return res.json(500,{
            message:"Error In api",
        });
        // return res.redirect('back');
    }
    
}
