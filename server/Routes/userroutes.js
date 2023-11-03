const express=require("express");
const { Registeruser, authuser, createBookmark, getBookmarksByUsername} = require("../Controllers/usercontroller");
// const { protect } = require("../Controllers/authmiddleware");
const router=express.Router();

router.post('/login',authuser);
router.post('/register',Registeruser);
router.post('/bookmark',createBookmark)
router.get('/getbookmark',getBookmarksByUsername)
module.exports=router;