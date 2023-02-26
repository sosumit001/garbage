import  { Schema,model } from "mongoose"


const UserSchema = new Schema({
    name:{
        type:String,
        default:''
    },
    username:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    createdAt: {
        type:String,
        default:''
    },
    token: String,
    userLinks : [
        {
            title:String,
            link:String
        }
    ],
    currentBgClass:{
        type:String,
        default:'bg-img-1'
    },
    banner: {
        type:Schema.Types.ObjectId,
        ref:'Banner'
    }
})




export default model('User',UserSchema)