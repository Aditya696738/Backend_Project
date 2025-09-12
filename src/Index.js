import connectDB from "./Db/index.js";

 // require('dotenv').config({path: './env'})

// "nodemon -r dotenv/config --experimental-json-modules src/index.js"

 import dotenv from 'dotenv'
 dotenv.config({path : './env'})
connectDB();


/* import express from "express";

const app = express()
//iife
( async()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       app.on("error" , (error)=>{
        console.log("error" , error);
        throw error
       })

       app.listen(process.env.PORT , ()=>{
        console.log(`app is running on port ${process.env.PORT}`)
       })

    }catch(error){
        console.log("Error : " , error)
    }
})() */