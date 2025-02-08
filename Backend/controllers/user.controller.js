const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const CampaignModel = require("../models/campaign.model");
const saltRounds = 10;
const secretkey=process.env.SECRET_KEY

//user sign up
async function Signup(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password){
        return res.status(404).json({ msg: "all fields must be filled!" });

    }

    bcrypt.hash(password, saltRounds,async function (error, hash) {
      // Storing the hasshed password in database
      if(error) return res.status(402).json({msg:"some error occured",error})
      await userModel.create({username,email,password:hash})
      return res.status(200).json({msg:"user created successfully!"})
    });
  } catch (err) {
    return res.status(402).json({ msg: "some error occured" });
  }
}

//user sign in
async function Signin(req, res) {
  try {
    const {email, password } = req.body;
    const user=await userModel.findOne({email})
    if(!user) return res.status(404).json({msg:"user not found Please sign up!"})
    
    //hasshed password from database
    const hash=user.password

    //compare the password
    bcrypt.compare(password, hash, function (error, result) {
      // result == true
      if(error) return res.status(402).json({msg:"some error occured",error})
      if(result){
        //creating the token
        const payload={username:user.username,email:user.email}
        const token=jwt.sign(payload,secretkey,{expiresIn:'5h'})
        return res.status(200).json({msg:"user signin successfully",token})
      }
      else{
        return res.status(401).json({msg:"password is incorrect!"})
      }
    });
  } catch (err) {
    return res.status(402).json({ msg: "some error occured" });
  }
}

//all users
async function allUser(req,res){
  try{
    const alluser=await userModel.find({})
    return res.status(200).json({data:alluser})
  }
  catch(error){
    return res.status(500).json({msg:"some error occured"})
  }
}

//get particular user
async function getparticularuser(req,res){
  try {
    const id=req.params.id
    const user=await userModel.findOne({_id:id})
    return res.status(200).json({data:user})
  }
  catch (error) {
    return res.status(500).json({ msg: "some error occured" });
  }
}

//see all the campaign by a particular campaign
async function allcampaign(req,res){
  try{
    //get the token
    const token=req.headers.token

    //decoded the token
    const decoded=jwt.verify(token,secretkey)

    //get the user
    const user=await userModel.findOne({email:decoded.email})

    //get all the campaign by that user
    const campaigns=await CampaignModel.find({'creator.userId':user._id})

    return res.status(200).json({allcampaigns:campaigns})
  }
  catch(error){
    return res.status(500).json({msg:"error occured"})
  }
}

// get the analatics of the campaign
async function getanalatics(req,res){
  try{
    //campaign id
    const campaignid=req.params.id

    const campaigndetail=await CampaignModel.find({_id:campaignid})
    return res.status(200).json({campaigndetail})

  }
  catch(error){
    return res.status(500).json({msg:"some error occured"})
  }
}

module.exports = {
  Signup,
  Signin,
  allUser,
  getparticularuser,
  allcampaign,
  getanalatics,
};