import { ApolloServer,gql } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "./gql/typeDefs.js";
import resolvers from "./gql/resolvers/index.js";
import dotenv from 'dotenv'


dotenv.config({path: './config.env'})

 const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => ({req})
    })

const URL = process.env.DATABASE
const PORT = process.env.PORT

mongoose.set('strictQuery', false)
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( () => {
    return server.listen({port:PORT})
})
.then((res) => {
    console.log('server is running at ',res.url)
})
.catch((err) => {
    console.error('Failed to connect to Database *_* :',err)
})
