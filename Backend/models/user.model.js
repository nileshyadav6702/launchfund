const mongoose=require('mongoose')

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    backedcampaigns: [
      {
        campaignid: { type: mongoose.Types.ObjectId },
        pledgeAmount: Number,
        pledgedDate:Date
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel=mongoose.model('userModel',userschema)

module.exports=userModel