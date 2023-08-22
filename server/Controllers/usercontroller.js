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

module.exports = { Registeruser, authuser };