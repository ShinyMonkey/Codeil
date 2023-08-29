const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');



router.get('/',homeController.home);
router.use('/users',require('./user'));
router.use('/posts',require('./post'));
router.use('/comment',require('./comments'));
router.use('/likes',require('./likes'));
router.use('/friends',require('./friends'));
// router.use('./users',require('./user'));
router.use('/api',require('./api'))

console.log('Router Active')
module.exports=router;