const express=require("express");
const { Registeruser, authuser} = require("../Controllers/usercontroller");
// const { protect } = require("../Controllers/authmiddleware");
const router=express.Router();

router.post('/login',authuser);
router.post('/register',Registeruser);
// router.route('/').get(protect,alluseroute);

module.exports=router;