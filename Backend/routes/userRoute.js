const express=require('express')
const {
  Signup,
  Signin,
  allUser,
  getparticularuser,
} = require("../controllers/user.controller");
const UserRoute=express.Router()

//signup the user
UserRoute.post('/signup',Signup)


//login the user
UserRoute.post('/signin',Signin)

//get all the user
UserRoute.get("/get", allUser);

//get a particular user
UserRoute.get("/get/:id", getparticularuser);

module.exports=UserRoute