import { ApolloError } from "apollo-server"
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../schema/UserSchema.js'
import Banner from '../schema/BannerSchema.js'

export default {

    Query: {
        // get one user
        getUser: async (_,{username}) => await User.findOne({username}),
        // get all users
        getUsers: async () => await User.find()
    },
    Mutation: {
        async signupUser ( _, {username, password, name} ) {

            const hashPassword = await bycrypt.hash(password,12)
            const oldUser = await User.findOne({username})
            if(oldUser){
                throw new ApolloError('username: '+ username + 'already exist','USER_EXIST')
            }
            const user = new User({
                username:username,
                password:hashPassword,
                createdAt:new Date().toISOString(),
                name:name
            })

            // create token
            const token = jwt.sign({
                user_id:user._id, username
            },"unsafe_string",{
                expiresIn:'2h'
            })

            const banner = await Banner.findOne()

            user.banner = banner
            user.token = token

            const res = await user.save()

            return {
                id:res._id,
                ...res._doc
            }
            
        },

        async loginUser(_, {username,password}) {
            //See if exist
            const user = await User.findOne({username})
            //check id entered password equals to encrypted one
            if(user && (await bycrypt.compare(password,user.password)))
            {
                const token = jwt.sign({
                    user_id:user._id, username
                },"unsafe_string",{
                    expiresIn:'2h'
                })
                user.token = token

                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                throw new ApolloError('Incorrect password')
            }
            //create a new token
        }
    },
    async setName(_,{username, name}){
        const user = await User.findOne({username})

        if(!user){
            throw new Error(`User ${username} not found`)
        }

        if(typeof user.name === 'string'){
            await User.updateOne({username}, {$set: {name}})
        }
        else {
            await User.updateOne({username},{$set:{name: name}})
        }

        return name || " "
    }
}