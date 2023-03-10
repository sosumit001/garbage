import Link from '../schema/LinkSchema.js'

import User from '../schema/UserSchema.js'
import { AuthenticationError, ForbiddenError } from 'apollo-server'

export default {
    Query:{
    getLinks : async () => {
            try{
                const links = await Link.find()
                return links
            } catch( err ) {
                throw new Error(err)
            }
        },
    getLink : async (_,{linkId}) => {
        try{
            const link = Link.findById(linkId)

            if(link) {
                return link
            } else {
                throw new Error('Link not found')
            } 
        } catch ( err ) { 
            throw new Error(err)
        }
    },
    getUserLinks: async (_,{userId}) => {
        const links = await Link.find({user:userId})
        return links
    }
},
    Mutation:{
        async createLink(_,{inputValue,userId}){

            const user = await User.findById(userId)
            const {linkTitle,linkValue} = inputValue
            const oldLink = await Link.findOne({linkValue})

            if(!oldLink){
                if(user){
                    const newLink = new Link({
                    linkTitle,
                    linkValue,
                    user:user.id
                })
                const link = await newLink.save()
                return link
                }
                throw new Error('something wrong')
            }
            throw new Error('link already exist')
        }, 

        async deleteLink(_,{linkId,userId}){
            const user = await User.findById(userId)

            if(!user){
                throw new AuthenticationError('user not authenticated')
            }

            const link = await Link.findById(linkId)

            if(!link){
                throw new Error('Link not found')
            }

            //check if user is authorized to delete
            if(userId !== user.id){
                throw new ForbiddenError('User not authorized to delete link')
            }

            await link.delete()

            return 'Link deleted successfully'
        }
        
    }
}

