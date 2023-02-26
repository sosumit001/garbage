import Banner from '../schema/BannerSchema.js'

export default {
    Query:{
        getBanner: async (_,{id}) => Banner.findById(id)
    }
}