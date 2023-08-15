const express=require('express');
const router=express.Router();


const post_v2Api=require('../../../controllers/api/v2/post_api_v2');

router.get('/',post_v2Api.index);

module.exports=router;