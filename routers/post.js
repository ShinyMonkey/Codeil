const express=require('express');
const router=express.Router();
const passport=require('passport');
const postController=require('../controllers/posts_controller');

router.post('/create-post',passport.checkAuthenticate,postController.creatPost);
router.get('/distroy/:id',passport.checkAuthenticate,postController.distroyComment);
module.exports=router;
