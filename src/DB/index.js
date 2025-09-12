import mongoose from "mongoose";
import {DB_NAME} from "../Constants.js";


const connectDB = async()=>{
    try {
       const dbConnection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       console.log(`\n MongoDB is connected !! DB HOST : ${dbConnection.connection.host}`)

       // console.log(dbConnection);
       
    } catch (error) {
        console.log("Mongodb connection error" , error);
        process.exit(1);
    }
}
export default connectDB;