import mongoose from "mongoose";

const mongodbUrl=process.env.MONGODB_URL

if(!mongodbUrl){
    throw new Error("MONGODB_URL is not defined in environment variables");
}