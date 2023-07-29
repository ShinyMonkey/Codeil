const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller');
const passport = require('passport');

router.get('/profile/:id',passport.checkAuthenticate,userController.profile);

router.get('/signup',userController.signUp);


router.get('/signin',userController.signin);

router.post('/create',userController.create);

router.post('/create-session',passport.authenticate('local',{failureRedirect: '/users/signin'}),userController.creatSessions)

router.get('/sign-out',userController.deleteSession);


// router.post('/create-post',)

module.exports=router;