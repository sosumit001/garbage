import { gql } from "apollo-server-express";

export default gql`
  type ProfileUrl {
    url: String!
  }
  type User {
    id: ID!
    email: String!
    fullname: String!
    username: String!
    createdAt: String!
    token: String!
    password: String!
    isVerify: Boolean
    verificationToken: String
    profileImage: String
    publicId:String
  }
  type Link {
    id: ID!
    linkTitle: String!
    linkValue: String!
    user: User!
  }

  input LinkInput {
    linkTitle: String!
    linkValue: String!
  }

  type Query {
    getUser(id: ID!): User!
    getUsers: [User]

    getLinks: [Link]
    getLink(userID: ID!): Link
    getUserLinks(userId: ID!): [Link!]!
  }

  type Mutation {
    signupUser(
      username: String!
      password: String!
      fullname: String!
      email: String!
    ): User!
    loginUser(username: String!, password: String!): User!
    sendVerificationEmail(email: String!): String!
    verifyUser(userId: ID!, verificationToken: String!): Boolean!

    createLink(inputValue: LinkInput!, userId: ID!): Link!
    deleteLink(linkId: ID!, userId: ID!): String!
    uploadProfileImg(profileImage:String!,publicId:String!,user_id:ID!): ProfileUrl!
  }
`;
