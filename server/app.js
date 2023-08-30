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

const postDetails = (pics) => {
    setPicLoading(true);
    if (!pics) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const formData = new FormData();
      formData.append("file", pics);
      formData.append("upload_preset", "chatify");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dfbyjohop/image/upload",
          formData
        )
        .then((response) => {
          console.log(response);
          const imageUrl = response.data.secure_url;
          setPic(imageUrl);
          console.log(imageUrl);
          setPicLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };