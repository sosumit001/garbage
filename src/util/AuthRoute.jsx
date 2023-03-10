import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

function AuthRoute({component:Component,rest}) {
  const { user } = useContext(AuthContext)

  return user ? (
    <Navigate to="/" replace={true} />
  ) : (
    <Component/>
  );
}

export default AuthRoute;
