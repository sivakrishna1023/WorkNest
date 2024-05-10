import React, { useState } from "react";
import { Link } from "react-router-dom";
import trash  from "./contents";

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  return (
      <>
        {
          trash.map((link)=>(
             <div className="" >
                <div className="px-3 text-left md:cursor-pointer group">
                  <h1 className="py-7 flex justify-between items-center md:pr-0 pr-5" onClick={()=> { heading!==link.name? setHeading(link.name) : setHeading(""); setSubHeading("") }}> 
                  {link.name} 
                  <span className="text-xl md:hidden inline">
                  {
                     heading===link.name ?
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                     </svg> 
                     :
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                                    
                  }
                  </span>

                  <span className="text-xl md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                  {
        
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                                    
                  }
                  </span>

                  </h1> 
                  {link.submenu && 
                       <div className="">
                      <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                          <div className="py-2">
                            <div className="w-4 h-4 left-3 absolute bg-white rotate-45" ></div>
                          </div>
                        <div className="bg-white p-5 grid grid-cols-3 gap-10">
                          {
                            link.sublinks.map((mysublinks)=>(
                              <div className="">
                                <h1 className="text-lg font-semibold"  >{mysublinks.Head}</h1>
                                 {
                                  mysublinks.sublink.map((slink)=>(
                                     <li className="text-sm text-gray-600 my-1.5"  > 
                                      <Link to={`${slink.link}`} className="hover:text-cyan-600" >{slink.name}</Link> </li>
                                  ))
                                 }
                              </div>
                            ))
                          }
                        </div>
                      </div>
                  </div>   }
                </div>
                {/* Mobile menu */}
                <div className={`${heading===link.name ? "md:hidden" : "hidden"}  `} >
                  {
                    // sublinks
                    link.sublinks.map((slinks)=>(
                      <div className="">
                        <div className="">
                          <h1 onClick={()=> subHeading !== slinks.Head ? setSubHeading(slinks.Head) : setSubHeading("")}    className="py-4 pl-7 font-semibold md:pr-0 pr-5 py-7 flex justify-between items-center">{slinks.Head}
                          <span className="text-xl md:mt-1 md:ml-3 inline">
                            {
                             subHeading===slinks.Head ?
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                              </svg> 
                              :
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                                              
                            }
                  </span>
                          </h1>
                          <div className={`${subHeading===slinks.Head ? "md:hidden" : "hidden"}`}>
                            {
                              slinks.sublink.map((slink)=>(
                                <div className="py-3 pl-14"> 
                                  <Link to={slink.link} className="hover:text-cyan-600"> {slink.name} </Link>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
             </div>
          ))
        }
      </>
  );
};

export default NavLinks;