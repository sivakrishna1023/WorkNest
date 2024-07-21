import React, { useState } from 'react'
import Appbar from '../../shared/Appbar'
import { server } from '../../constants/config'


const UserAppbar = () => {
    const deleteUser=async()=>{
    }
    const links=[
        {name:"delete Account",clickingEvent: deleteUser},
        {name:"Sign Out",path:"/"},
        {name:"Applied Jobs",path:"/user/appliedjobs"},
        {name:"Jobs to Apply",path:"/user"}
      ]
  return (
   <Appbar links={links} >
   </Appbar>
  )
}

export default UserAppbar
