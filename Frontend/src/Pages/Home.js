import * as React from 'react';
import Features from '../Components/Feature';
import Hero from '../Components/Hero';
import Appbar from '../shared/Appbar';
import Footer from '../Components/Footer';


function AppAppBar() {
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