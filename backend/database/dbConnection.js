import mongoose from "mongoose";

export const dbconnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM"
        });
        console.log("Database connected successfully !!");
    } catch (err) {
        console.log("Database connection failed", err);
        process.exit(1);
    }
};
