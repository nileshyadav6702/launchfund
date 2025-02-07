const CampaignModel = require("../models/campaign.model")
const jwt=require("jsonwebtoken")
const path = require("path");
const userModel = require("../models/user.model")
const uploadImage = require("../others/uploadImage")
const secretkey = process.env.SECRET_KEY;

//create a campaign
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

//get all the campaign
async function getallCampaign(req,res){
  try{
    const allcampaign=await CampaignModel.find({})
    res.status(200).json({msg:"all data",data:allcampaign})
  }
  catch(err){
    return res.status(401).json({msg:"some error occured"})
  }
}

//get a campaign by id
async function getCampaignbyId(req,res){
  try{
    const id=req.params.id
    const campaigndata=await CampaignModel.findOne({_id:id})
    return res.status(200).json({data:campaigndata})
  }
  catch(error){
    return res.status(401).json({msg:"some error occured"})
  }
}

//increase the donated amount
async function donateAmount(req,res){
  try{
    //amount to be donated
    const amounttoincrease=req.body.amountdonated
    //campaign id
    const id=req.params.id
    
    //token of the user donated the amount
    const token=req.headers.token
    const user=jwt.verify(token,secretkey)
    const backedcampaign = {
      campaignid: id,
      pledgeAmount: amounttoincrease,
      pledgedDate:Date.now()
    };
    //update the users backed campaign
    await userModel.updateOne(
      { _id: user._id },
      { $push: { "backedcampaigns": {...backedcampaign } } }
    );
    
    //who is the backer of this campaign
    const backer = {
      userId: user._id,
      name: user.username,
      email: user.email,
      pledgedAmount: amounttoincrease,
      pledgedDate:Date.now()
    };

    //update the database
    await CampaignModel.updateOne(
      { _id: id },
      { $inc: { currentAmount: +amounttoincrease } ,$push:{'backers':{...backer}}}
    );
    return res.status(200).json({msg:"donated successfully"})
  }
  catch(error){
    return res.status(401).json({msg:"some error occured"})
  }
}

//comment on the campaign
async function commentonCampaign(req,res){
  try{
    //amount to be donated
    const content = req.body.content;

    //campaign id
    const id = req.params.id;

    //token of the user donated the amount
    const token = req.headers.token;
    const user = jwt.verify(token, secretkey);

    //push the comment in comment section in database
    await CampaignModel.updateOne(
      { _id: id },
      { $push: { comments: { userId:user._id,name:user.username,content:content,date:Date.now()} } }
    );
    return res.status(200).json({msg:"comment executed successfully!"})
  }
  catch(error){
    return res.status(500).json({msg:"some error occured"})
  }
}

//delete a particular campaign
async function deleteCampaign(req,res){
  try{
    const id=req.params.id
    await CampaignModel.findByIdAndDelete({_id:id})
    return res.status(200).json({msg:"campaign deleted successfully"})
  }
  catch(error){
    return res.status(500).json({msg:"some error occured"})
  }
}

module.exports = {
  CreateCampaign,
  getallCampaign,
  getCampaignbyId,
  donateAmount,
  deleteCampaign,
  commentonCampaign,
};