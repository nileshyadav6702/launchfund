const mongoose=require('mongoose')
const url=process.env.MONGO_URI

async function connectmongo() {
    try{
        await mongoose.connect(url)
        return console.log('mongodb connected successfully')
    }
    catch(err){
        return console.log('error occured')
    }
}

module.exports=connectmongo