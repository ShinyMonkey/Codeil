const express=require('express');
const router=express.Router();
// const postApi=require('./posts');
const userApi=require('../../../controllers/api/v1/user_api');

router.post('/create-session',userApi.creatSessions);

module.exports=router;