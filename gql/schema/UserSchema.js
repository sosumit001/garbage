import  { Schema,model } from "mongoose"


const UserSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt: {
        type:String,
        required:true
    },
    verificationToken: {
        type: String,
        default:'token_field'
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    token: {
        type:String,
        required:true
    },
    profileImage: {
        type: String,
        default:''
    },
    publicId: {
        type:String,
        default:''
    }
})




export default model('User',UserSchema)