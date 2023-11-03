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
  const { title, url, username } = req.body;

  // Validate the input data
  if (!title || !url || !username) {
    res.status(400).json({ message: "Title, URL, and Username are required fields." });
    return;
  }

  try {
    // Find the user by their username
    const user = await User.findOne({ name:username });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

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
  const { username } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ name:username });

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


module.exports = { Registeruser, authuser , createBookmark ,getBookmarksByUsername};