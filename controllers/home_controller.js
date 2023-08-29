const Post=require('../models/post');
const User=require("../models/user");
const Friendships=require('../models/friendships');
module.exports.home=async function(req,res){
    // res.end("<h1>Express is up for Codeil</h1>")
    // if(req.isAuthenticated()){
    //     return res.redirect('/users/profile');
    // }
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'user',
    //     }
    // })
    // .exec().then(function(posts){
    //     User.find({}).exec().then(function(user){
    //         return res.render('home',{
    //             title:'Codel',
    //             header:'header',
    //             posts:posts,
    //             user_list:user,
    //         })
    //     })
        
        
    // })
    try {
        let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user',
        },
        populate:{
            path:'likes',
        }
    }).populate('likes');
        let user=await User.find({}).select('-password').populate('friends');
        let friends= await Friendships.find({})
        .sort('-createdAt')
        .populate('from_user to_user')
        console.log(friends);
        return res.render('home',{
            title:'Codel',
            header:'header',
            posts:posts,
            user_list:user,
            friends:friends,
        })
    } catch (error) {
        console.log(error,'Error');
        return;
    }
    
        
    
}


// module.exports.actionName=function(req,res){};