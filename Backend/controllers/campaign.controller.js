const CampaignModel = require("../models/campaign.model")
const jwt=require("jsonwebtoken")
const path = require("path");
const userModel = require("../models/user.model")
const uploadImage = require("../others/uploadImage")
const secretkey = process.env.SECRET_KEY;

//create a capaign
async function CreateCampaign(req,res){
    try{
        const {
          title,
          tagline: description,
          location,
          goalAmount,
          category,
          tags,
          image,
        } = req.body;
        //getting the token from frontend
        const token=req.headers.token
        
        //token verification
        const decoded=jwt.verify(token,secretkey)
        if(!decoded) return res.status(401).json({msg:"token is not valid signin again"})
        const useremail=decoded.email
        const user=await userModel.findOne({email:useremail})

        //creator
        const creator = { userId :user._id,name:user.username,email:user.email};


        //storing the image in cloudinary
        const imageurl = await uploadImage(image);
        //saving the data of campaign into database 
        await CampaignModel.create({title,description,location,goalAmount,category,tags,image,backers:[],comments:[],creator,image:imageurl})

        return res.status(200).json({msg:'campaign created successfully'})
    }
    catch(error){
        return res.status(401).json({msg:"some error occured"})
    }
}

module.exports={CreateCampaign}