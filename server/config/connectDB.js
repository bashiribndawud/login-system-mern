import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose"

async function connectDB(){
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoose.set("strictQuery", true);
        const db = await mongoose.connect(uri);
        console.log("Database connected");

        return db
}

export default connectDB