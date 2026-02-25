import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_DB_URL!;


if(!MONGODB_URL){
    throw new Error("Please Add Mongo DB URL");
    
}

let cached = global.mongoose



if(!cached){
    cached = global.mongoose = {conn:null,promise:null }
}


export async function ConnectToDB() {
    if(cached.conn){
        return cached.conn
    }

    mongoose.connect(MONGODB_URL).then(()=>{

    })

try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
    
}

