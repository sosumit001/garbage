import './SignupForm.css'
import { gql, useMutation} from '@apollo/client'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/auth'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {login,user} = useContext(AuthContext)

    const [addUser, { loading }] = useMutation(LOGIN_USER)

    const handleInputEffect = (element,V) => {
    
        if(element.value.length > V){
          element.style = 'border-bottom:2px solid black; color:black'
        } else {
          element.style = 'border-bottom: 2px solid rgb(157, 169, 180); color:rgb(157, 169, 180)'
        
        }
      }
    
      const handleUsernameChange = (event) => {
        const inputField = event.target
        inputField.value = inputField.value.toLowerCase()

        const regex = /^[a-zA-Z0-9._]+$/
        if(!regex.test(inputField.value)){
          inputField.value = inputField.value.replace(/[^a-zA-Z0-9._]/g, '');
        }
        handleInputEffect(inputField,2)
        setUsername(inputField.value)
        
      };
    
      const handlePasswordChange = (event) => {
        handleInputEffect(event.target, 7)
        setPassword(event.target.value)
      };
  const handleLogin = async (event) => {
    event.preventDefault()

    const result = await addUser({
        variables:{username, password},
      })

    const {data: {loginUser}} = result
    login(loginUser)
  }

const formField = user? (
<form id="form" onSubmit={handleLogin}>
  <h2 style={{borderBottom:"2px solid skyblue",width:"fit-content",margin:"auto", marginTop:"50px"}} >Hi, {user.fullname}</h2>
  <p>login to your account</p>
  <input type="text" spellCheck='false' id="username" name="username" placeholder='username' value={username} onChange={handleUsernameChange} /><br />
 
  <input type="password" id="password"  name="password" placeholder='password' value={password} onChange={handlePasswordChange} /><br />
  
  <input type="submit" id='formButton'  value={loading?"loading...":"logIn"} />
</form>
):(
  <form id="form" onSubmit={handleLogin}>
  <p>login to your accout</p>
  <input type="text" spellCheck='false' id="username" name="username" placeholder='username' value={username} onChange={handleUsernameChange} /><br />
 
  
  <input type="password" id="password"  name="password" placeholder='password' value={password} onChange={handlePasswordChange} /><br />
  

  <input type="submit" id='formButton'  value={loading?"loading...":"logIn"} />
</form>
)

return formField

}

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      username
      createdAt
      token
    }
  }
`;

export default LoginForm