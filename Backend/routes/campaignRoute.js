const express=require('express');
const {
  CreateCampaign,
  getallCampaign,
  getCampaignbyId,
  donateAmount,
  deleteCampaign,
  commentonCampaign,
} = require("../controllers/campaign.controller");
const CampaignRoute=express.Router()

//create campaign
CampaignRoute.post("/create", CreateCampaign);

//get campaign
CampaignRoute.get("/get", getallCampaign);

//get the particular campaign through id
CampaignRoute.get("/get/:id",getCampaignbyId)

//increase the amount of the campaign
CampaignRoute.put("/donate/:id",donateAmount)

//comment on the campaign
CampaignRoute.put("/comment/:id", commentonCampaign);


//delete a particular campaign
CampaignRoute.delete("/:id",deleteCampaign)
module.exports=CampaignRoute