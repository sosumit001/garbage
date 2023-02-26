import { gql } from "apollo-server"

export default gql`
 
    type Banner {
        id:ID!
        bgCollection:[String]
    }
 
    type User {
    id:ID!
    name:String!
    username: String!
    createdAt: String!
    token: String!
    password:String!
    banner:Banner
    currentBgClass:String!
   }
 
   type Query {
    getUser(username:String!): User
    getUsers:[User]

    getBanner(id:ID!):Banner
   }
   
   type Mutation {
    signupUser (username: String! password:String! name:String!) : User!
    loginUser (username: String! password:String!) : User!
    setName(username:String! name:String!):String

   }
`