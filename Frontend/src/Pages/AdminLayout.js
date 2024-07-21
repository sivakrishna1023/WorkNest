import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AdminElements from '../Components/Admin/AdminElements';
import Applicants from '../Components/Admin/Applicants';
import AdminAppbar from '../Components/Admin/AdminAppbar';
import AdminProfile from '../Components/Admin/AdminProfile';

const AdminLayout = () => {
  return (
    <>
      <AdminAppbar></AdminAppbar>
      <Routes>
        <Route exact path='/' element={<AdminElements/>}/>
        <Route exact path='/workapplicants' element={<Applicants/>}/>
        <Route exact path='/profile' element={<AdminProfile/>}/>
      </Routes>
    </>
  )
}

export default AdminLayout
