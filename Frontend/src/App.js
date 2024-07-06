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
import { getdetails } from './redux/actioncreators/User';

function App() {
  const user=useSelector((state)=>state.userdetails)
  const dispatch=useDispatch();
  const currUser=localStorage.getItem('token-type');
  const url=(currUser==='Recruiter')? `${server}/api/v1/admin/me` : `${server}/api/v1/user/me`
  useEffect(() => {
      const UserDetails= async()=>{
        console.log(url);
        await axios.get(url,{ headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        }})
        .then((data) =>{ console.log(data)

        })
        .catch((err) =>{console.log(err)
        });
      }
      axios.get(url,{ headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      }})
      .then((data) =>{ console.log(data)

      })
      .catch((err) =>{console.log(err)
      });
      // UserDetails();
  }, [dispatch]); 
  return (
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
