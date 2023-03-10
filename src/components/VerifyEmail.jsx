import { useState,useContext } from "react"
import { AuthContext } from "../context/auth"
import { gql,useMutation } from "@apollo/client"
import loading_cup from '../assets/tea-cup.gif'

import './SignupForm.css'
const VerifyEmail = ({ Username, Fullname, Password}) => {
    const [email,setEmail] = useState('')

    const [addUser,{loading}] = useMutation(SIGNUP_USER);
    const [verifcationURL,{loading:verificationLoading}] = useMutation(EMAIL_VERIFICATION);


    const [isValid,setIsValid] = useState(false)
    const {checkUserSignup} = useContext(AuthContext)

    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (emailRegex.test(inputEmail)) {
          setIsValid(true)
        } else {
          setIsValid(false)
        }
    
        setEmail(inputEmail);
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        if(isValid) {
            const result = await addUser({
                variables:{username:Username, password:Password, fullname: Fullname, email: email},
              })

            const {data:{signupUser: {verificationToken}}} = result
            console.log(verificationToken)

            const token = await verifcationURL({
              variables: {email:email}
            })

              
              const {data:{signupUser}} = result
              
              checkUserSignup(signupUser)
              
        } else {
          alert('email: '+ email + ' is not valid' )
        }
    }


    const ele = verificationLoading? (
      <>
      <div style={{ display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', position:'absolute',backgroundColor:'whitesmoke',margin:'0px auto',width:'100%',height:'100vh',zIndex:'5000'}}>
      <img style={{filter:'grayscale(100%)'}} width={150} src={loading_cup} alt="loading..." />
      <p style={{color:'grey',fontFamily:'serif'}}>It could take 1 or 2 min, please wait... </p>
      </div>
      </>
    ):(
      <>
      <form id="form" onSubmit={handleSubmitForm}>
          <h2 style={{margin:' 50px auto',width:'fit-content',borderBottom:'3px solid orange'}} htmlFor="user-verification">
              Hi, (•‿•) {Fullname}
          </h2>
          <input placeholder="email" spellCheck = {false} onChange={handleEmailChange} type="text" value={email} />
          <input style = {{display:'block', margin:'20px auto', width:'200px'}}  type="submit" id='formButton' value={loading?'...':'verify your email'} />
      </form>
      </>
    )

    return ele
}

const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $password: String!, $fullname:String!, $email:String!) {
    signupUser(username: $username, password: $password, fullname: $fullname, email: $email) {
      fullname
      username
      email
      createdAt
      token
      verificationToken
    }
  }
`;

const EMAIL_VERIFICATION = gql`
  mutation SendVerificationEmail($email:String!) {
    sendVerificationEmail(email:$email) 
  }
`

export default VerifyEmail