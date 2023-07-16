const express=require('express');

const router=express.Router();

const signupController=require('../controllers/user_controller');


router.get('/signup',signupController.signUp);


module.exports=router;