const express = require('express');
const mongoose=require("mongoose")
const { resolve } = require('path');
// const User = mongoose.model('User', userSchema);
const User =require("./schema")
require("dotenv").config()
const app = express();
const port = 3010;

const url=process.env.mongodb
const connect=mongoose.connect(process.env.mongodb)

app.use(express.json());  

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// app.use("/api",userRoute)


app.post("/api/users",(async(req,res)=>{
  const{name,email,password}=req.body;
  try {
    if (name && email && password)
{
  const user=new User({name,email,password});
  await user.save();
  res.status(201).json({message:"User created successfully",user});
}  
else{
  res.status(400).json({message:"invalid"});

}
} catch (error) {
  res.status(500).json({message:"internal server error"}) 

  }
}))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
