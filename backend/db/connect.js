import mongoose from "mongoose"

const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    } catch(error){ 
        console.log("Error connecting to MongoDB", error.message)
    }
}

export default connect