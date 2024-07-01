import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import UserElement from '../Components//User/UserElements'
import Applyjob from '../Components/User/Applyjob'
import UserAppbar from '../Components/User/UserAppbar';


const UserLayout = () => {
  return (
    <>
    <UserAppbar></UserAppbar>
    <Routes>
        <Route exact path='/' element={<UserElement/>}/>
        <Route exact path='/applyjob' element={<Applyjob/>}/>
    </Routes>
    </>
  )
}

export default UserLayout
