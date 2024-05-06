import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js"; 
import app from "./app.js";


(async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    
    console.log(`\n MongoDb connect at ${connectionInstance.connection.host}`);
    
    app.on("error",(error)=>{
      console.log("Error server not talk with db",error);
    })
    app.listen(process.env.PORT,()=>{
      console.log("App is listening on port ",process.env.PORT);
    });
  } catch (error) {
    console.log("Error while conneting", error);
  }
})();
