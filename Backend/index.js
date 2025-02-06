require('dotenv').config()
const express=require('express')
const connectmongo = require('./mongoconnect')
const app=express()
const port=process.env.PORT || 8000

//connectdb
connectmongo()


//middleware
app.use(express.json())


//user route
// app.use('/user',UserRoute)


//starting the server
app.listen(port,()=>console.log(`server started on port ${port}`))