const express=require('express');
const { CreateCampaign } = require('../controllers/campaign.controller');
const CampaignRoute=express.Router()

CampaignRoute.post("/create", CreateCampaign);

module.exports=CampaignRoute