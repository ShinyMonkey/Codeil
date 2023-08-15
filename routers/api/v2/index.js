const express=require('express');
const router=express.Router();

router.use('/posts',require('./postsV2'));


module.exports=router;