require('dotenv').config()
const express=require('express')
const connectmongo = require('./mongoconnect')
const UserRoute = require('./routes/userRoute')
const cors=require('cors')
const app=express()
const port=process.env.PORT || 8000

//connectdb
connectmongo()


//middleware
app.use(cors())
app.use(express.json())


//user route
app.use('/user',UserRoute)


//starting the server
app.listen(port,()=>console.log(`server started on port ${port}`))