import { ApolloServer,gql } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "./gql/typeDefs.js";
import resolvers from "./gql/resolvers/index.js";



 const server = new ApolloServer({
        typeDefs,
        resolvers
    })

const URL = 'mongodb+srv://sumit:sumo8204@cluster.rtylk8l.mongodb.net/artful?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( () => {
    return server.listen({port:4000})
})
.then((res) => {
    console.log('server is running at ',res.url)
})
.catch((err) => {
    console.error('Failed to connect to Database *_* :',err)
})

