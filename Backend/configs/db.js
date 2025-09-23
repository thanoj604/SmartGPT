import mongoose from "mongoose";

const MongoDBConnect = async () => {

    try {

        mongoose.connection.on('connected', ()=>{
            console.log("Database Connected");
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/SmartGPT`)
        
    } catch (error) {

        console.log(error.message);
        
    }

}

export default MongoDBConnect;