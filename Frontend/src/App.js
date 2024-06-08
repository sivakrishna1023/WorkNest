import './App.css';
import Home from './Pages/Home'
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Ainterface from './Pages/AddNewRole'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AppBar from './Components/Appbar';
import Uadmin from './Pages/Updateadmin'
import WorkAccordion from './Pages/Allworks';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/signup' element={<><AppBar name1="Sign Up" name2="Sign In"/><Signup></Signup></>}/>
        <Route exact path='/signin' element={<><AppBar name1="Sign Up" name2="Sign In"/><Signin></Signin></>}/>
        <Route exact path='/' element={<Home></Home>}/>
        <Route exact path='/admin' element={<><AppBar name3={<Uadmin> </Uadmin>} name4="delete Account" name5="Sign Out"/><WorkAccordion/><Ainterface></Ainterface></>}/>
        <Route exact path='/user' element={<></>}/>
      </Routes>
    </Router>
  );
}

export default App;
