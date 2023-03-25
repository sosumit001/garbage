import { ApolloError,UserInputError } from "apollo-server"
import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'

import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotev from 'dotenv'

import User from '../schema/UserSchema.js'
import cloudinary from 'cloudinary'

import path from "path"

import {fileURLToPath} from 'url'
import { createWriteStream, unlink } from "fs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotev.config({path: '../../config.env'})
const jwtString = process.env.JWTSTRING


export default {
    Query: {
        // get one user
        getUser: async (_,{id}) => {
            const user = await User.findById(id)
            return user
        },
        // get all users
        getUsers: async () => await User.find()
    },
    Mutation: {
        async signupUser ( _, {username, password, fullname, email} ) {

            const hashPassword = await bycrypt.hash(password,12)
            const oldUser = await User.findOne({username})

            if(oldUser){
                throw new UserInputError('username is taken',{
                    errors: {
                        username:'This username is taken'
                    }
                })
            }
            const user = new User({
                username:username,
                password:hashPassword,
                createdAt:new Date().toISOString(),
                fullname:fullname,
                email:email
            })

            // create token
            const token = jwt.sign({
                user_id:user._id,
                username,
                fullname 
            },jwtString,{
                expiresIn:'2h'
            })

            const verificationToken = jwt.sign({
                email:email
            },jwtString,{expiresIn:'10m'}).substring(0,10)

            user.token = token
            user.verificationToken = verificationToken

            const res = await user.save()

            return {
                id:res._id,
                ...res._doc
            }
            
        },
        async sendVerificationEmail(_,{email}){
            const user = await User.findOne({email})
            if(!user) throw new Error('User not found')

            //generate verification URL with user verification token

            const verificationUrl = `https://linktree.art/verify/${user.verificationToken}`

            //create Mailgen email template
            const mailGenerator = new Mailgen({
                theme:'default',
                product: {
                    name:'Linktree || artful',
                    link:'https://linktree.art'
                }
            })

            const emailBody = {
                body: {
                    intro: 'Welcome to Artful! Please verify your email address by clicking the button below:',
                    action: {
                        instructions: 'Click the button below to verify your email:',
                        button: {
                          color: '#22BC66',
                          text: 'Verify your email',
                          link: verificationUrl
                        }
                      },
                      outro: 'If you did not create an account with Artful, please disregard this email.'
    
                }
            }

            const emailHTML = mailGenerator.generate(emailBody)
            const emailTEXT = mailGenerator.generatePlaintext(emailBody)

            //sending email using nodemailer
            const transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user: 'sosumit001@gmail.com',
                    pass: 'vgutoivzbjdtjyom'
                }
            });

            const info = await transporter.sendMail(
                {
                    from:"<noreply@artful.com>",
                    to:email,
                    subject:"artful :: verify your account",
                    text:emailTEXT,
                    html:emailHTML
                }
            )

            return "verified successfully!!"

        },
        async verifyUser(_,{userId,verificationToken}) {
            const user = await User.findById(userId)

            if(user.verificationToken !== verificationToken) {
                throw new Error('somethings wrong dude!')
            }
            user.isVerify = true
            await user.save()

            return true

        }
        ,


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
        },
        async uploadProfileImg(_,{profileImage,publicId,user_id}) {
            const user = await User.findById(user_id)

            if(!user) {
                throw new Error('user not found!!')
            }
  
            user.profileImage = profileImage
            user.publicId = publicId

            await user.save()
            
            return {
                url:profileImage
            }
        }
           
    },
}
