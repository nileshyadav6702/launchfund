const express=require('express')
const { Signup, Signin } = require('../controllers/user.controller')
const UserRoute=express.Router()

//signup the user
UserRoute.post('/signup',Signup)


//login the user
UserRoute.post('/signin',Signin)


module.exports=UserRoute