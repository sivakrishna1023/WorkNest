import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import UserElement from '../Components//User/UserElements'
import Applyjob from '../Components/User/Applyjob'
import UserAppbar from '../Components/User/UserAppbar';
import Appliedjobs from '../Components/User/Appliedjobs';
import UserProfile from '../Components/User/UserProfile';

const UserLayout = () => {
  return (
    <>
    <UserAppbar></UserAppbar>
    <Routes>
        <Route exact path='/' element={<UserElement/>}/>
        <Route exact path='/applyjob' element={<Applyjob/>}/>
        <Route exact path='/appliedjobs' element={<Appliedjobs/>}/>
        <Route exact path='/profile' element={<UserProfile/>}/>
    </Routes>
    </>
  )
}

export default UserLayout
