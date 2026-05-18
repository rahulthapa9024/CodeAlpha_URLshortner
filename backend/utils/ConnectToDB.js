import mongoose from "mongoose";

export const ConnectToDB = ()=>{
   try{
    mongoose.connect(process.env.DB_URL)
    console.log("Connected to DatatBase ✅")
   }catch(err){
    console.log(err)
   }
}