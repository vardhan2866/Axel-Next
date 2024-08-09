import mongoose, { mongo } from "mongoose";
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require : [true, "name is required"]
    },
    email:{
        type: String,
        require :[true, "email is required"],
        unique : true
    },
    password:{
        type: String,
        require:[true, "Password is required"]
    },
    isVerified:{
        type : Boolean,
        default : false
    },
    verifyToken:{
        type : String,
        default : null
    },
    forgotPasswordToken:{
        type : String,
        default : null,
    },
    tokenValidity:{
        type:Date,
    }
})
const User = mongoose.models.users || mongoose.model('users',UserSchema); 
export default User; 