// import React, { useState } from 'react'
// import { BeakerIcon, XMarkIcon,Bars3BottomRightIcon } from '@heroicons/react/24/solid'
// import menu_data from './contents';

// const Header_basic = () => {
//   const [open,setopen]=useState(false);
//   return (
//        <div className="bg-white shadow-md w-full sticky top-0">
//        <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
//           <div className='font-bold text-2xl cursor-pointer flex items-center gap-1' >
//           <BeakerIcon className='w-7 h-7 text-blue-600'/>
//           <span>Inscrible</span>
//           </div>
//           {/* {Menu icon} */}
//           <div className="flex"> 
//           <div onClick={()=>setopen(!open)} className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7">         
//             <button className='btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static'>Login</button>
//                 {
//                  open ? <XMarkIcon/>:<Bars3BottomRightIcon/>
//                 }
//           </div>
//           </div>
//           {/* Linking the item's */}
//          <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
//           {
//              menu_data.map((link)=>(
//               <li className='md:ml-8 md:my-0 my-7 font-semibold'>
//                     <a href={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>{link.title}</a>
//               </li>
//              ))
//           }
//          </ul>  
//        </div>
//        </div>
//   )
// }

// export default Header_basic


// // import React, { useState } from 'react';
// // import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'

// // const Header_basic = () => {
// //     let Links =[
// //         {name:"HOME",link:"/"},
// //         {name:"SERVICE",link:"/"},
// //         {name:"ABOUT",link:"/"},
// //         {name:"CONTACT",link:"/"},
// //       ];
// //       let [open, setOpen] =useState(false);

// //     return (
// //         <div className='shadow-md w-full fixed top-0 left-0'>
// //            <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
// //             {/* logo section */}
// //             <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
// //                 <BookOpenIcon className='w-7 h-7 text-blue-600'/>
// //                 <span>Inscribe</span>
// //             </div>
// //             {/* Menu icon */}
// //             <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
// //                 {
// //                     open ? <XMarkIcon/> : <Bars3BottomRightIcon />
// //                 }
// //             </div>
// //             {/* linke items */}
// //             <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
// //                 {
// //                     Links.map((link) => (
// //                     <li className='md:ml-8 md:my-0 my-7 font-semibold'>
// //                         <a href={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>{link.name}</a>
// //                     </li>))
// //                 }
// //                 <button className='btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static'>Get Started</button>
// //             </ul>
// //             {/* button */}
// //            </div>
// //         </div>
// //     );
// // };

// // export default Header_basic;