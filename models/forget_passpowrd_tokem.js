const mongoose=require('mongoose');

const finderSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accesstoken:{
        type:String,
        require:true
    },
    is_valid:{
        type:Boolean,
        require:true,
    }
},{
    timestamps:true,
});

const Reset=mongoose.model('Reset',finderSchema);

module.exports=Reset;