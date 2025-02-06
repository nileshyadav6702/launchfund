const mongoose=require('mongoose')

//schema
const campaignSchema = new mongoose.Schema({
  title: {
    type: String
  },
  location:String,
  description: String,
  creator: {
    userId: mongoose.Types.ObjectId,
    name: String,
    email: String,
  },
  goalAmount: Number,
  currentAmount: {
    type: Number,
  },
  backers: [
    {
      userId: mongoose.Types.ObjectId,
      name: String,
      email: String,
      pledgedAmount: Number,
      pledgedDate: Date,
    }
  ],
  comments: [
    {
      userId: mongoose.Types.ObjectId,
      name: String,
      content: String,
      date: Date,
    }
  ],
  status: { type: String, enum: ["active", "completed", "canceled"] ,default:"active"},
  category:String,
  tags:[String],
  image:String,

},{timestamps:true});

const CampaignModel=mongoose.model('CampaignModel',campaignSchema)

module.exports=CampaignModel