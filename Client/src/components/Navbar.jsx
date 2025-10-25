import React from 'react'
import { useState,useEffect } from 'react';
import { User2Icon } from 'lucide-react';
import { LogOutIcon } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { replace, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';
const Navbar = () => {
  const [isLoading, setisLoading] = useState(false)
  const [isLogin, setisLogin] = useState(null);
  useEffect(() => {
    const checkStatus = async()=>{
      const res = await axios.get("http://localhost:3000/users/loginstatus");
      setisLogin(res.data.isLogin)
    }
    checkStatus();
}, [])
  const navigate = useNavigate();
  return (
    <div className='flex justify-between w-full h-[10%]'>
      {isLoading && <Loader/>}
      <div className='flex flex-col gap-2'>
        <div className='flex pl-2 pt-5 lg:pl-10 lg:pt-10'>
            <p className='text-3xl sm:text-4xl lg:text-5xl font-sans font-bold'>&lt;</p>
            <p className='text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-blue-500'>/</p>
            <p className='text-3xl sm:text-4xl lg:text-5xl font-sans font-bold'>&gt; Code</p>
            <p className='text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-blue-500'>C</p>
            <p className='text-3xl sm:text-4xl lg:text-5xl font-sans font-bold'>ache</p>    
        </div>
        <div>
            <p className='text-xl lg:text-3xl font-sans text-gray-600 p-5 lg:pl-10'>Store, organize, and search your code snippets with tags</p>
        </div>
      </div>
      <div className=''>
        <ul className='flex gap-5'>
          {isLogin? (
              <div className='flex items-center justify-center'>
                <li className='flex cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 lg:mt-10 lg:mr-10 mt-3' ><User2Icon className='cursor-pointer m-2 border rounded-2xl'/></li>
                <li className='flex cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 lg:mt-10 lg:mr-10 mt-3' onClick={()=>{  
                  const logout = async()=>{
                    setisLoading(true)
                    const res = await axios.post("http://localhost:3000/users/logout",{},{withCredentials:true});
                    setisLoading(false)
                    navigate('/login',{replace:true})
                  }
                  logout();
                }}><LogOutIcon/></li>
              </div>
            ):(
              <div>
                <li className='flex cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 lg:mt-10 lg:mr-10 mt-3'><LogIn/></li>
              </div>
            )
              
          }
            
            

        </ul>
      </div>
    </div>
  )
}

export default Navbar
