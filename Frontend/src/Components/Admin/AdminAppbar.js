import React from 'react'
import Appbar from '../../shared/Appbar'
import Updateadmin from './Updateadmin'

const AdminAppbar = () => {
    const deletingadmin=async()=>{
        try{
          const newpromise=await fetch('http://localhost:3000/api/v1/admin/delete',{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authorization':`bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({})
        })
        if (!newpromise.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await newpromise.json();
        console.log(data);
        alert('Admin Deleted');
        window.location.href='http://localhost:3001/'
        } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Could Not Delete Admin');
        }
      }
  const links=[
    {name:"delete Account",clickingEvent: deletingadmin},
    {name:"Sign Out",path:"/"},
    {name:"Update Details",path:"/update"}
  ]
  return (
      <Appbar links={links}  ></Appbar>
  )
}

export default AdminAppbar
