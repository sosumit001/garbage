import userResolvers from "./userResolvers.js"
import linkResolvers from "./linkResolvers.js"

export default {
    Query: {
        ...userResolvers.Query,
        ...linkResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...linkResolvers.Mutation
    }
}