const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');



router.get('/',homeController.home);
router.use('/users',require('./user'));
router.use('/users',require('./post'));
router.use('/users',require('./signin'));
router.use('./users',require('./signup'));

console.log('Router Active')
module.exports=router;