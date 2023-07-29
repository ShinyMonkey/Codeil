const Post=require('../models/post');
const User=require("../models/user");
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
        User.find({}).exec().then(function(user){
            return res.render('home',{
                title:'Codel',
                header:'header',
                posts:posts,
                user_list:user,
            })
        })
        
        
    })
    
}


// module.exports.actionName=function(req,res){};