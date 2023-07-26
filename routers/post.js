const express=require('express');
const router=express.Router();
const postController=require('../controllers/posts_controller');

router.post('/create-post',postController.creatPost);
module.exports=router;
