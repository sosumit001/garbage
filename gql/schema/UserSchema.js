import  { Schema,model } from "mongoose"
const linkSchema = new Schema({
    linkTitle:{
        type:String,
        required:true
    },
    linkVal:{
        type:String,
        required:true
    }
})

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
   
})




export default model('User',UserSchema)