import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AdminElements from '../Components/Admin/AdminElements';
import Applicants from '../Components/Admin/Applicants';
import Appbar from '../shared/Appbar';
import Uadmin from '../Components/Admin/Updateadmin'
import AdminAppbar from '../Components/Admin/AdminAppbar';

const AdminLayout = () => {
  return (
    <>
      <AdminAppbar></AdminAppbar>
      <Routes>
        <Route exact path='/' element={<AdminElements/>}/>
        <Route exact path='/workapplicants' element={<Applicants/>}/>
      </Routes>
    </>
  )
}

export default AdminLayout
