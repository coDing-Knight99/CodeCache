import React from 'react'
import { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
const ProtectedRoute = ({children}) => {
    const [isLoading, setisLoading] = useState(true);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    useEffect(() => {
        const checkValid=async()=>{
            try{
                const res = await axios("https://codecache-830q.onrender.com/users/loginstatus");
                setisAuthenticated(res.data.isLogin);
            }catch(error)
            {
                console.error("Error checking login status",error);
                setisAuthenticated(false);
            }
            finally{
                setisLoading(false);
            }
        }
        checkValid();
    }, [])
    
    if(isLoading){
        return <Loader/>
    }
    if(!isAuthenticated)
    {
        return <Navigate to='/login' replace/>
    }
    return children;
};

export default ProtectedRoute
