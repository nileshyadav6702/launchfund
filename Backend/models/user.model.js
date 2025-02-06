const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

const userModel=mongoose.model('userModel',userschema)

module.exports=userModel