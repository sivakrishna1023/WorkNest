import * as React from 'react';
import Features from '../Components/Feature';
import Hero from '../Components/Hero';
import Appbar from '../shared/Appbar';
import Footer from '../Components/Footer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userNotExists } from '../redux/reducers/auth';
import {Toaster,toast} from 'react-hot-toast';
import { server } from '../constants/config';
import axios from 'axios';

function AppAppBar() {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const handleSignOut= async()=>{
    const toastId=toast.loading("Please Wait LoginOut")
    const currUser=localStorage.getItem('token-type');
    const url=(currUser==='Recruiter')? `${server}/api/v1/admin/logout` : `${server}/api/v1/user/logout`
    try{
      const res= await axios.get(url,{ headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      }});
      const {data}=res;
      if(data.success){
        dispatch(userNotExists(null));
        localStorage.removeItem("token");
        localStorage.removeItem("token-type");
        toast.success("Logged Out Successfully",{id:toastId});
      }else{
        toast.error("Loging Out failed ",{id:toastId});
      }
    }catch(error){
        toast.error("Error in LogOut",{id:toastId});
    }
  }
  const redirectTo= user && user.role=="Candidate" ? {name:"Apply to Jobs",path:"/user"} : {name:"Post New",path:"/admin"}
  const links= !user ?  [
    {name:"Sign Up",path:"/signup"},
    {name:"Sign In",path:"/signin"},  ] : [
    redirectTo,
    {name:"SignOut",clickingEvent:handleSignOut},
  ];
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Appbar features='features' subscription='subscription'  links={links}/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  );
}

export default AppAppBar;