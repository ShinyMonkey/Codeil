const express=require('express');
const router=express.Router();
const passport=require('passport');
const commentController=require('../controllers/comment_controller');

router.post('/create',passport.checkAuthenticate,commentController.create);
router.get('/distroy/:id',passport.checkAuthenticate,commentController.distroyComment);
module.exports=router;
