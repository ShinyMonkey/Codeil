const mongoose=require('mongoose');
const friendshipsSchema= new mongoose.Schema({
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
},{
    timestamps:true,
});


const Friendships=mongoose.model('Friendships',friendshipsSchema);

module.exports=Friendships;