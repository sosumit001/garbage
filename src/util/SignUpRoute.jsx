import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

function SignUpRoute({component:Component,rest}) {
  const {user} = useContext(AuthContext)

  const ele = (user)?
  (<Navigate to={'/verify'} replace={true} />):
  (<Component/>)

  return ele


}

export default SignUpRoute;
