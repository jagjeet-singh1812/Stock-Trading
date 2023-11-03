const express=require('express');
const cors=require('cors');
require('dotenv').config()
const app=express();
const port=process.env.PORT||5000;
const connectDB = require('./Config/db');
const { notFound, errorHandler } = require('./Middleware/Errormiddleware');
const userroutes=require("./Routes/userroutes");


app.use(express.json());
app.use(cors());
app.use('/api/v1/user',userroutes);
app.use(notFound);
app.use(errorHandler);

const start=async()=>{
await connectDB();
app.listen(port,()=>{
    console.log(`started at http://localhost:${port}/`.yellow.bold);
})
}

start();
