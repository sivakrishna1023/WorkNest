import React, { useState } from 'react'
import Appbar from '../../shared/Appbar'
import { server } from '../../constants/config'


const UserAppbar = () => {
    const [jobData,setJobData]=useState([]);
    const getAppliedJobs=async()=>{
        // console.log(isLoading);
        fetch(`${server}/api/v1/work/appliedworks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            setJobData([]);
            setJobData(data["works"]);
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
          });
      }
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
