import mongoose from "mongoose"

const dbconnection = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO)
       console.log("connected", mongoose.connection.host)
    }
    catch(error){
        console.log(error)
    }
}
export default dbconnection; 