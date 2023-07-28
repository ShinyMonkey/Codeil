const Post=require('../models/post')
module.exports.home=function(req,res){
    // res.end("<h1>Express is up for Codeil</h1>")
    // if(req.isAuthenticated()){
    //     return res.redirect('/users/profile');
    // }
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user',
        }
    })
    .exec().then(function(posts){
        return res.render('home',{
            title:'Codel',
            header:'header',
            posts:posts,
        })
        
    })
    
}


// module.exports.actionName=function(req,res){};