import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:100,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
    },
    password:{
        type:String,
        required:true,
        min:5,
    },
    city:String,
    state:String,
    country:String,
    phoneNumber:String,
    occupation:String,
    transcation:Array,
    role:{
        type:String,
        enum:["user","admin","superadmin"],
        default:"admin"
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema)
export default User;