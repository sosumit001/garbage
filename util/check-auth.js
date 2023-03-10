import { AuthenticationError } from 'apollo-server'
import jwt from 'jsonwebtoken'

export default (context) => {
     const authHeader = context.req.headers.authorization
     if(authHeader){
        const token = authHeader.split('Bearer ')[1]
        if(token){
            try{
                const user = jwt.verify(token,'unsafe_string')
                return user
            } catch(err) {
                throw new AuthenticationError('invalid/expired token')
            }
        }
        throw new Error('Auth token must needed')
     }
    throw new Error('header must')
     
}