import './App.css';
import Home from './Pages/Home'
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AppBar from './shared/Appbar';
import AdminLayout from './Pages/AdminLayout';
import UserLayout from './Pages/UserLayout';
import { useSelector } from 'react-redux';
import ProtectRoute from './Components/auth/ProtectRoute';
import { ProtectRouteCandidate,ProtectRouteRecruiter } from './Components/auth/ProtectRoute';

function App() {
  const user=useSelector((state)=>state.userdetails)
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
