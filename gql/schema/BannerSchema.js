import  { Schema,model } from "mongoose"

const BannerSchema = new Schema({
    bgCollection:[String]
})



export default model('Banner',BannerSchema)
