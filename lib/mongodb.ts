import mongoose from "mongoose";


const connectioString = process.env.CONNECTION_STRING as string

export const connectDB = async () => {
    try {
        const res = await mongoose.connect(connectioString)
        console.log("DB connection Successfull!!")
    }
    catch(err){
        console.log("DB connection failed!!")
        console.log(err)
    }
}