
const Friends=require('../models/friendships');
const User=require('../models/user');
module.exports.addfriend= async function(req,res){
    try {
        let from_user=await User.findById(req.params.userid)
        let to_user= await User.findById(req.params.id);
        let areFriends=false;
        
        // console.log(from_user._id.toString());
        for(f of to_user.friends){
            for(f1 of from_user.friends){
                if(f._id.toString() == f1._id.toString()){
                    areFriends=true;
                }
            }
        }

        // cant add friend if already frends from diff user
        let user2Friend= await Friends.findOne({
            from_user:to_user._id,
            to_user : from_user._id
        })

        if(user2Friend){
            areFriends=true;
            
        }


        let friends= await Friends.findOne({
            from_user: from_user._id,
            to_user : to_user._id,
        });


        // console.log(friends);
        if(areFriends){
            if(user2Friend){
                
            from_user.friends.pull(user2Friend._id);
            to_user.friends.pull(user2Friend._id);
            to_user.save();
            from_user.save();
            user2Friend.deleteOne();
            areFriends= false;
            return res.json(200,{
                message: "No Longer Friends Friend updated",
                data:{
                    areFriends:areFriends,
                }
            })
            console.log('No Longer Friends');
            }else{
                console.log(friends._id)
                from_user.friends.pull(friends._id);
                to_user.friends.pull(friends._id);
                to_user.save();
                from_user.save();
                friends.deleteOne();
                areFriends= false;
                return res.json(200,{
                    message: "No Longer Friends Friend updated",
                    data:{
                        areFriends:areFriends,
                    }
                });
                console.log('No Longer Friends');
            }
            
        }else{
            console.log('now are Friends');
                let newFriend=await Friends.create({
                from_user:from_user._id,
                to_user:to_user._id,
            });
            from_user.friends.push(newFriend._id);
            from_user.save();
            to_user.friends.push(newFriend._id);
            to_user.save();
            areFriends=true;
        }
        return res.json(200,{
            message: "Friend updated",
            data:{
                name: to_user.name,
                areFriends:areFriends,
            }
        })

        // let friends=false;

        // let from_user=await User.findById(req.params.userid)
        // let to_user= await User.findById(req.params.id);
        // let isfriends = await User.findById(to_user._id);
        // for(let i of isfriends.friends){
        //     if(i._id.toString()  == from_user._id.toString()){
        //         friends=true;
        //     }
        // }
        // console.log(friends);
        // if(!friends){
        //     if(to_user){
        //     await Friends.create({
        //         from_user:from_user._id,
        //         to_user:to_user._id,
        //     });
        //     from_user.friends.push(to_user);
        //     from_user.save();
        //     to_user.friends.push(from_user);
        //     to_user.save();
        //     return res.redirect('back');
        // }
        // }else{
        //     console.log("already friends")
        //     return res.redirect('back');
        // }
    } catch (error) {
        return res.json(500,{
            message: "Server Problem",
        })
    }
}


