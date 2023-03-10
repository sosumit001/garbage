import {createContext,useReducer} from 'react'
import jwtDecode from 'jwt-decode'

const intialState = {
    user: null,
    isSignUp:false,
    isLogedIn:false,
}

if(localStorage.getItem("jwtToken")){
    const decodeToken = jwtDecode(localStorage.getItem("jwtToken"))

    if(decodeToken.exp*1000 < Date.now()){
        localStorage.removeItem('jwtToken')
    } else {
        intialState.user = decodeToken
    }
}

const AuthContext = createContext({
    isSignUp:false,
    isLogedIn:false,
    user:null,
    login:(userData) => {},
    logout: () => {},
    checkUserSignup: (userData) => {},
})


function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isLogedIn:true,
            }
        case 'SIGNUP' :
            return {
            ...state,
            user: action.payload,
            isSignUp:true
        }
        case 'LOGOUT':
                return {
                    ...state,
                    user: null,
                    isSignUp:false,
                    isLogedIn:false
            }
        default:
            return state
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, intialState)

    function login(userData) {
        localStorage.setItem("jwtToken",userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
        localStorage.removeItem("jwtToken")
        dispatch({
            type: 'LOGOUT'
        })
    }

    function checkUserSignup(userData) {
        localStorage.setItem("jwtToken",userData.token)

        dispatch({
            type:'SIGNUP',
            payload: userData
        })
    }

return (
<AuthContext.Provider value = {{user: state.user,isSignUp:state.isSignUp,isLogedIn:state.isLogedIn, login,logout,checkUserSignup}}
{...props}
/>
)
}

export {AuthContext, AuthProvider}
