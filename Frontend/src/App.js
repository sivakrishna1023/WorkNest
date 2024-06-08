import './App.css';
import Home from './Components/MainComponent/Home'
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Ainterface from './Components/AddNewRole'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AppBar from './Components/MainComponent/Appbar';
import Uadmin from './Components/Updateadmin'
import WorkAccordion from './Components/Allworks';
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
