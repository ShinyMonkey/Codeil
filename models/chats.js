const mongoose= require('mongoose');

const chatschema= new mongoose.Schema({
    message:{
        type:String,
        require:true,
    },
    user_email:{
        type:String,
        require:true
    }
},{
    timestamps:true,
})


const Chats= mongoose.model('Chats', chatschema);
module.exports=Chats;