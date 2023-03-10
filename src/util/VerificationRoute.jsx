import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

function VerificationRoute({component:Component,rest}) {
  const {isVerify} = useContext(AuthContext)

  const ele = (isVerify)? (
    <Navigate to = '/' replace = {true} />
  ): (
    <Component/>
  )

  return ele
}

export default VerificationRoute;
