import * as React from 'react';
import Features from '../Components/Feature';
import Hero from '../Components/Hero';
import Appbar from '../shared/Appbar';
import Footer from '../Components/Footer';
import { useSelector } from 'react-redux';


function AppAppBar() {
  const user=useSelector((state)=>state.userdetails);
  console.log(user);
  const links=[
    {name:"Sign Up",path:"/signup"},
    {name:"Sign In",path:"/signin"},
  ]
  return (
    <div>
      <Appbar features='features' subscription='subscription' links={links}/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  );
}

export default AppAppBar;