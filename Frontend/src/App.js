import './App.css';
import Home from './Pages/Home'
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AppBar from './shared/Appbar';
import AdminLayout from './Pages/AdminLayout';
import UserLayout from './Pages/UserLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/signup' element={<><AppBar name1="Sign Up" name2="Sign In"/><Signup></Signup></>}/>
        <Route exact path='/signin' element={<><AppBar name1="Sign Up" name2="Sign In"/><Signin></Signin></>}/>
        <Route exact path='/' element={<Home></Home>}/>
        <Route exact path='/admin/*' element={<AdminLayout></AdminLayout>}/>
        <Route exact path='/user/*' element={<UserLayout></UserLayout>}/>
      </Routes>
    </Router>
  );
}

export default App;
