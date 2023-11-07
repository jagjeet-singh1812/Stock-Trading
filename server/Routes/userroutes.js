const express=require("express");
const { Registeruser, authuser, createBookmark, getBookmarksByUsername, removebookmark} = require("../Controllers/usercontroller");
// const { protect } = require("../Controllers/authmiddleware");
const router=express.Router();

router.post('/login',authuser);
router.post('/register',Registeruser);
router.post('/bookmark',createBookmark)
router.post('/getbookmark',getBookmarksByUsername)
router.post('/remove',removebookmark)
module.exports=router;