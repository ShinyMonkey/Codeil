const Like=require('../models/likes');
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.likes= async function(req,res){
    try {
        let deleted=false;
        let likeables;
        if(req.params.type == 'Post'){
            likeables= await Post.findById(req.params.id).populate('likes');
        }else{
            likeables= await Comment.findById(req.params.id).populate('likes');
        }
        // likes or not
        let isliked = await Like.findOne({
            user:req.user._id,
            likeable:req.params.id,
            onModel:req.params.type,
        });


        if(isliked){
            likeables.likes.pull(isliked._id);
            likeables.save();
            isliked.deleteOne();
            deleted=true;

        }else{
            let newlike=await Like.create({
                user:req.user._id,
                likeable:req.params.id,
                onModel:req.params.type,
            });

            likeables.likes.push(newlike._id);
            likeables.save();

        }

        return res.json(200,{
            message: "Like is published",
            data:{
                deleted:deleted,
            }
        })
        // return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.json(500,{
            message: "Error while Like is published",
        })
    }

}