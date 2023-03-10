import { Routes, Route } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Preview from '../build/Preview';
import App from '../App';
import SignupForm from '../components/SignupForm';
import Verify from '../components/Verify';
import VerifyGeneratedToken from '../components/VerifyGeneratedToken';

import LoginForm from '../components/LoginForm';
import Edit from '../build/Edit';
import AuthRoute from './AuthRoute';
// import SignUpRoute from './SignUpRoute';
import AutheditRoute from './AutheditRoute';
import VerificationRoute from './VerificationRoute';
import SignUpRoute from './SignUpRoute';

import loading_svg from '../assets/bars.svg'
import LinkList from '../build/buildComponent/LinkList';
import LinkField from '../build/buildComponent/LinkField';

const GET_USERS = gql`
  query Getusers {
    getUsers {
      id,
      username,
      fullname
    }
  }
`;
const loadingStyle = {
  position:"absolute",
  top:0,
  left:0,
  height:"100vh",
  width:"100vw",
  backgroundColor:"whitesmoke",
  margin:"auto",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  zIndex:5000
}

function AppRoutes() {
  const { loading, data, error } = useQuery(GET_USERS);

  if (loading) return <div style={loadingStyle}><img height={50} src={loading_svg} /></div>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data.getUsers.map(user => [user.id, user.username]);

  return (
    <Routes>
       <Route  path='/' element={<App/>}></Route>
      <Route path="/signup" element={<SignUpRoute component={SignupForm}/>}></Route>

       <Route path="/login" element={<AuthRoute component={LoginForm}/>} />
       <Route  path='/edit' element={<AutheditRoute component={Edit}/>}/>
       <Route  path='/linklist' element={<LinkList edit_mode = {true} user_id = {'63fd486b1fec1eae3b700bf6'} />}/>
       <Route path='/template' element={<Preview/>}></Route>
       <Route path='/verify/:token' element={<VerificationRoute component={VerifyGeneratedToken}/>}></Route>
       <Route path='/verify' element={<VerificationRoute component={Verify}/>}></Route>
       <Route path='/linkfield' element={<LinkField  user_id = {'63fd486b1fec1eae3b700bf6'} />}></Route>

      {users.map((_user,k) => (
        <Route
          path={`${_user[1]}`}
          element={loading?<div>loading</div>:(<Preview user_id={_user[0]} />)}
          key={k}
        />
      ))}
    </Routes>
  );
}


export default AppRoutes