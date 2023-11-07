const connectDB = require("./Config/db");
require('dotenv').config()
const data=require('./data')
const blog=require('./models/blog')
const start=async()=>{
try{
 await connectDB(process.env.mongo_uri);
 console.log("Connected to MongoDB");
 await blog.deleteMany();
 await blog.insertMany(data);
 console.log("sucess!!!");
}catch(e){
    console.log(e);
}
}
start();