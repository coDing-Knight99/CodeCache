import React from 'react'
import { useState,useEffect } from 'react';
import { User2Icon } from 'lucide-react';
const Navbar = () => {
  const [isLogin, setisLogin] = useState(null);
  useEffect(() => {
    fetch("/users/loginstatus",{
      credentials:"include",
    })
    .then(res=>res.json())
    .then(data=>{
      setisLogin(data.isLogin);
    })
    .catch(()=>{
      setisLogin(false);
    })
  }, [isLogin])
  
  return (
    <div className='flex justify-between w-full h-[10%]'>
      <div className='flex flex-col gap-2'>
        <div className='flex pl-2 pt-5 lg:pl-10 lg:pt-10'>
            <p className='text-4xl lg:text-5xl font-sans font-bold'>&lt;</p>
            <p className='text-4xl lg:text-5xl font-sans font-bold text-blue-500'>/</p>
            <p className='text-4xl lg:text-5xl font-sans font-bold'>&gt; Code</p>
            <p className='text-4xl lg:text-5xl font-sans font-bold text-blue-500'>C</p>
            <p className='text-4xl lg:text-5xl font-sans font-bold'>ache</p>    
        </div>
        <div>
            <p className='text-2xl lg:text-3xl font-sans text-gray-600 p-5 lg:pl-10'>Store, organize, and search your code snippets with tags</p>
        </div>
      </div>
      <div className=''>
        <ul className='flex gap-5'>
          {isLogin ? 
            <li className='pt-10 pr-10 text-4xl' ><User2Icon className='cursor-pointer m-2 border rounded-2xl'/></li>
            :
            <li className='pt-5 pr-5 lg:pt-10 lg:pr-15 lg:text-xl cursor-pointer' onClick={()=>{}}>Login / SignUp</li>
          }
            
            

        </ul>
      </div>
    </div>
  )
}

export default Navbar
