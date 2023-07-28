const express=require('express');
const router=express.Router();
const passport=require('passport');
const commentController=require('../controllers/comment_controller');

router.post('/create',passport.checkAuthenticate,commentController.create);
module.exports=router;
