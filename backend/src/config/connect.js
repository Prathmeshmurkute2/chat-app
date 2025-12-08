import mongoose from 'mongoose'
import { ENV } from './env.js';

const connectDB= async()=>{
    try{
        const { MONGO_URI } = ENV;
        if(!MONGO_URI){
            throw new Error("MONGI_URI is not set")
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("mogoDB connected successfully.")
    }catch(error){
        console.error("MongoDB connection error",error.message);
        process.exit(1)
    }
}



export default connectDB