import * as React from 'react';
import Features from '../Components/Feature';
import Hero from '../Components/Hero';
import Appbar from '../Components/Appbar';
import Footer from '../Components/Footer';


function AppAppBar() {
  return (
    <div>
      <Appbar name1="Sign Up" name2="Sign In" features='features' subscription='subscription'/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  );
}

export default AppAppBar;