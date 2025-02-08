const express=require('express')
const {
  Signup,
  Signin,
  allUser,
  getparticularuser,
  allcampaign,
  getanalatics,
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

//get all the campaign created by particular user
UserRoute.get("/allcampaign",allcampaign)

//get the analatics of the campaign
UserRoute.get("/allcampaign/analatics/:id",getanalatics)
module.exports=UserRoute