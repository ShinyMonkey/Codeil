const express=require('express');
const router=express.Router();
const passport = require('passport');
const fridensController=require('../controllers/friends_controller');

router.get('/addfriend/:id/:userid',passport.checkAuthenticate,fridensController.addfriend);


module.exports=router;