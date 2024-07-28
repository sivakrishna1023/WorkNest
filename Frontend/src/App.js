import { useEffect } from 'react';
import './App.css';
import Home from './Pages/Home'
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AdminLayout from './Pages/AdminLayout';
import UserLayout from './Pages/UserLayout';
import { useDispatch, useSelector } from 'react-redux';
import ProtectRoute from './Components/auth/ProtectRoute';
import { ProtectRouteCandidate,ProtectRouteRecruiter } from './Components/auth/ProtectRoute';
import axios from 'axios'
import { server } from './constants/config';
import {  userExists,userNotExists } from './redux/reducers/auth'
function App() {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const currUser=localStorage.getItem('token-type');
  const url=(currUser==='Recruiter')? `${server}/api/v1/admin/me` : `${server}/api/v1/user/me`
  useEffect(() => {
      const UserDetails= async()=>{
        const token=localStorage.getItem('token');
        if(!token || !currUser){
          dispatch(userNotExists(null));
          return;
        }
        try{
          const res= await axios.get(url,{ headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          }})
          const {data}=res;
          if(data && data.user!==null){
            dispatch(userExists({...data.user,role:currUser}));
          }else{
            dispatch(userNotExists(null));
          }
        }catch(error){
          dispatch(userNotExists(null));
        }
      }
      UserDetails();
  }, [dispatch]); 
  return loader ? <h1>Loading...</h1> : (
    <Router>
      <Routes>
      <Route  path='/' element={<Home></Home>}/>
       <Route
          element={
            <ProtectRoute user={!user}/>
          }
        >
           <Route  path='/signup' element={<><Signup></Signup></>}/>
           <Route  path='/signin' element={<><Signin></Signin></>}/>
        </Route>
        <Route
          element={
            <ProtectRouteCandidate user={user} redirect='/'  >
            </ProtectRouteCandidate>
          }
        > <Route  path='/user/*' element={<UserLayout></UserLayout>}/>
        </Route>
        <Route
          element={
            <ProtectRouteRecruiter user={user} redirect='/'  >
            </ProtectRouteRecruiter>
          }
        >
        <Route  path='/admin/*' element={<AdminLayout></AdminLayout>}/> 
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
