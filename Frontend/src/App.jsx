import React,{ useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home'
import Getstarted from './Pages/Getstarted'
import Login from './Pages/Login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
    <div className='bg-gradient-to-r bg-cyan-200 to-bg-cyan-100 w-full'>
     <Header/>
     <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Getstarted" element={<Getstarted/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>   
     </Routes>
     <Footer/>
    </div>
    </Router>
    </>
  )
}

export default App
