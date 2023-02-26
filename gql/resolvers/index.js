import userResolvers from "./userResolvers.js"
import bannerResolver from "./bannerResolver.js"


export default {
    Query: {
        ...userResolvers.Query,
        ...bannerResolver.Query
    },
    Mutation: {
        ...userResolvers.Mutation
    }
}