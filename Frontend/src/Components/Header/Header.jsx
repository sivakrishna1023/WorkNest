import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BeakerIcon } from '@heroicons/react/24/solid';
import NavLinks from "./Navlinks";
import Button from "./Button";

const Header = () => {
  const [open,setopen]=useState(false);
  return (
    <nav className="bg-white sticky top-0.5 rounded-xl z-10">
       <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full"  >
          <div className='font-bold text-2xl md:cursor-pointer flex justify-between gap-1 pr-7' >
            <div className="flex gap-1">
            <BeakerIcon className='w-7 h-7 text-blue-600'/>
            <span>Inscrible</span>
            </div>
            <div className="md:hidden" onClick={()=>{setopen(!open)}}  >
            {
              !open ?(
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              ):
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            }
            </div>
          </div>
        </div>
        <div className="md:flex hidden flex uppercase items-center gap-8 font-[poppins]">
          <div>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </div>
         <NavLinks/>
        </div>
          <div className="md:block hidden">
          <Button/>
          </div>
          {/* Moblie Header */}
          <div className={`md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4 duration-500 ${open? 'left-0':'left-[-100%]'}`} >
            <div>
              <Link to="/" className="py-7 px-3 inline-block">
                Home
              </Link>
            </div>
            <NavLinks/>
            <div className="py-5">
              <Button/>
            </div>
          </div>
       </div>
    </nav>
  );
};

export default Header;