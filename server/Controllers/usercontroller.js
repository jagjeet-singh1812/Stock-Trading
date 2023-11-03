const asyncHandler = require("express-async-handler");
const User = require('../models/user');

const { Error } = require("mongoose");
const generatetoken = require("../Config/token");
require("mongoose");

const Registeruser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill all the Feilds");
  }
  const userexist = await User.findOne({ email });
  if (userexist) {
    res.status(400);
    throw new Error("User Already exists");
  }
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generatetoken(user._id),
    });
    console.log(user);
  } else {
    res.status(400);
    throw new Error("Failed to Create the User ");
  }
});

const authuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (user && (await user.matchpassword(password))) {
    const jsson={
        _id: user._id,
      name: user.name,
      email: user.email,
      token: generatetoken(user._id),
    }
    res.status(201).json(jsson);
    console.log(jsson);
  } else {
    res.status(500).send("User not Found");
  }
});


const Bookmark = require("../models/bookmark");
const createBookmark = asyncHandler(async (req, res) => {
  const { title, url, email} = req.body;

  // Validate the input data
  if (!title || !url || !email) {
    res.status(400).json({ message: "Title, URL, and Username are required fields." });
    return;
  }

  try {
    // Find the user by their username
    const user = await User.findOne({ email});
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    console.log(title);
    console.log(url);
const alreadyther= await Bookmark.findOne({user,title})
if(alreadyther) return res.status(203).json(alreadyther);
    // Create a new bookmark for the user
    const bookmark = await Bookmark.create({
      title,
      url,
      user: user._id,
    });

    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ message: "Bookmark creation failed.", error: error.message });
  }
});


const getBookmarksByUsername = asyncHandler(async (req, res) => {
  const { email } = req.body;
console.log(req.body)
  try {
    // Find the user by username
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // Fetch all bookmarks for the user
    const bookmarks = await Bookmark.find({ user: user._id });

    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve bookmarks.", error: error.message });
  }
});


const removebookmark=async(req,res)=>{
  try {
    const { email, title } = req.body;
    console.log("Email:", email);
    console.log("Title:", title);
    const user= await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const id=user._id
    console.log(id);
    const result = await Bookmark.findOneAndDelete({ user:id,title });
    console.log(result)
    if (!result) {
      return res.status(404).json({ message: "Bookmark not found" });
    }
  
    return res.status(200).json({ message: "Bookmark removed successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to remove bookmark", error: error.message });
  }
  
}


module.exports = { Registeruser, authuser , createBookmark ,getBookmarksByUsername,removebookmark};