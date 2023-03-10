import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

function AutheditRoute({component:Component}) {
  const { user } = useContext(AuthContext)

  return user ? 
      (
    <Component/>
  ):(
  <Navigate to="/" replace={true} />
  )
}

export default AutheditRoute;
