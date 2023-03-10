import { Schema,model } from "mongoose"

const linkSchema = new Schema({

    linkTitle:String,
    linkValue:String,
        
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
})

export default model('Link',linkSchema)