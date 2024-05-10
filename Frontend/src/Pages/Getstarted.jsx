import React, { useState } from 'react'
import {server} from '../constants/config'

const Getstarted = () => {
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const handlesubmit = async()=>{
    try{
        const res=await fetch(`${server}/api/v1/user/register`,{
          method:'POST',
          headers:{
           'Content-Type': 'application/json',
          },
          body: JSON.stringify({
           name:name,
           email:email,
           password:password
          })
        })
        const data=await res.json();
        if(data.success){
          console.log(data);
        }else{
          console.log("Error occured")
        }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
    <div className="flex justify-center items-center md:p-8 p-5 relative">
    <div className="w-full px-4 md:max-w-md md:px-0">
    <div className="bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
     
        <div className="mb-4">
          <div className="relative">
            <input
              onChange={(e)=>setname(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Name"
            />
            <span className="absolute top-2 left-3 text-gray-500">
              <i className="far fa-user"></i>
            </span>
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              onChange={(e)=>setemail(e.target.value)}
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Email"
            />
            <span className="absolute top-2 left-3 text-gray-500">
              <i className="far fa-envelope"></i>
            </span>
          </div>
        </div>
        <div className="mb-6">
          <div className="relative">
            <input
              onChange={(e)=>setpassword(e.target.value)}
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
            <span className="absolute top-2 left-3 text-gray-500">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <button
          onClick={handlesubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Sign Up
        </button>
      <div className="mt-6 text-center">
        <p className="text-gray-600">Or sign up with</p>
        <button className="mt-2 bg-white shadow-md hover:bg-gray-100 px-4 py-2 rounded-lg">
          <i className="fab fa-google text-blue-500"></i>
        </button>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default Getstarted
