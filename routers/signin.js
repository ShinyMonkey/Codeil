const express=require('express');

const router=express.Router();

const signinController=require('../controllers/user_controller');


router.get('/signin',signinController.signUp);


module.exports=router;