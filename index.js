const express = require("express");
const mongoose = require("mongoose");
const { resolve } = require("path");
const User = require("./schema");
require("dotenv").config();
const app = express();
const port = 3010;

const url = process.env.mongodb;
const connect = mongoose.connect(process.env.mongodb);

app.use(express.json());

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

app.post("/api/users", async (req, res) => {
 
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if(error.name==="ValidationError"){
      return res.status(400).json({message:error.message})
    }
    res.status(500).json({ message: "internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
