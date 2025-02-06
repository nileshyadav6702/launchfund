const express=require('express');
const {
  CreateCampaign,
  getallCampaign,
} = require("../controllers/campaign.controller");
const CampaignRoute=express.Router()

//create campaign
CampaignRoute.post("/create", CreateCampaign);

//get campaign
CampaignRoute.get("/get", getallCampaign);


module.exports=CampaignRoute