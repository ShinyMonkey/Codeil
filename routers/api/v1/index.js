const express=require('express');
const router=express.Router();
// const postApi=require('./posts');

router.use('/posts',require('./posts'));
router.use('/users',require('./user'));

module.exports=router;