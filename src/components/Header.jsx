import { Link } from 'react-router-dom'

import { useContext, useState } from 'react'
import { AuthContext } from '../context/auth'

import './Header.css'


export const Header = () => {
    const [menuClick,setMenuClick] = useState(false)
    const {user,isLogedIn, logout} = useContext(AuthContext)

    const setHeaderParams = ({height,top}) => {
        return `height:${height};top:${top};`
    }

    const handleHeader = () => {
        const extrnHeader_1 = document.querySelector('.Header-external-part-1')

        const change = document.querySelector('.changeBGMENU')
        if(!menuClick){
            extrnHeader_1.style = setHeaderParams({height:'90px',top:'0%'})
            change.style = "--width:30px; --height:30px; --color:white"
            setMenuClick(true)
        } else {
            extrnHeader_1.style = setHeaderParams({height:"0px",top:'0px'})
      
            change.style = "--width:20px; --height:20px; --color:grey"
            setMenuClick(false)
        }
    }
    const handleLogout = (event) => {
        event.preventDefault()
        logout()
        window.open('/','_self')
    }
    const menuBar = user? (
        <div id="Header">
       
        <div className='Header-external-part-1' onClick = {handleHeader}>
        <ul>
            <li><Link to={'/'} >Home</Link></li>
            <li><Link to={'edit'} >edit</Link></li>
            <li><Link to={user.username} >preview</Link></li>
            <li><Link onClick={handleLogout} >logOut</Link></li>
        </ul>
        <span className='changeBGMENU'>
        </span>
        </div>
    </div>
    ):(
        <div id="Header">
      
        <div className='Header-external-part-1' onClick={handleHeader}>
           
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/signup'>SignUp</Link></li>
                <li><Link to='/login'>LogIn</Link></li>
            </ul>
            <span className='changeBGMENU'>
            </span>
        </div>

      
    </div>
    )
    return menuBar
}


