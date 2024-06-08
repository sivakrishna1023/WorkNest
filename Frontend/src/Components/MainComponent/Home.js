import * as React from 'react';
import Features from './Feature';
import Hero from './Hero';
import Appbar from './Appbar';
import Footer from './Footer';


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