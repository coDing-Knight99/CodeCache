import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [loader, setloader] = useState(false)
  const [isLogin, setIsLogin] = useState(true);
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [fullname, setfullname] = useState('')
  const [password, setpassword] = useState('')
  const [usernamelog, setusernamelog] = useState('')
  const [passwordlog, setpasswordlog] = useState('')
  const navigate = useNavigate();
  const Register = async function(){
    console.log({fullname,email,username,password});
    try{
        setloader(true);
        const res=await axios.post("https://codecache-830q.onrender.com/users/register",{username,email,password,fullname});
        document.getElementById("username").value='';
        document.getElementById("email").value='';
        document.getElementById("fullname").value='';
        document.getElementById("password").value='';
        setfullname('');
        setemail('');
        setusername('');
        setpassword('');
        toast(res.data.message,{className:"font-bold text-lg"});
        console.log(res.status)
        if(res.status==201)
        {
          try{
            const resLog = await axios.post("https://codecache-830q.onrender.com/users/login",{username:username,password:password});
            toast(resLog.data.message,{className:"font-bold text-lg"});
            console.log(res.data);
          }
          catch(error)
          {
            console.error("Error Logging in after registering",error);
            toast("Login Failed!",{className:"font-bold text-lg"});
          }
          navigate('/',{replace:true})
        }
        // await handleLogin();
        setloader(false);
        console.log(res.data);

    }catch(error)
    {
        setloader(false);
        console.error('Error registering user:', error);
        toast(error.response.data.message||"Registration Failed",{className:"font-bold text-lg"});
    }
}
const handleLogin = async function(){
  console.log({usernamelog,passwordlog});
  try{
    setloader(true);
    const res = await axios.post("https://codecache-830q.onrender.com/users/login",{username:usernamelog,password:passwordlog});
    document.getElementById("usernamelog").value='';
    document.getElementById("passwordlog").value='';
    setpasswordlog('');
    setusernamelog('');
    setloader(false);
    // toast(res.data.message,{className:"font-bold text-lg"});
    navigate('/',{replace:true})
    // console.log(res.data);
  }catch(error){
    setloader(false);
    console.log("Error Logging In");
    toast(error.response.data.message || "Login Failed",{className:"font-bold text-lg"});
  }
  
}

  return (
    <div className="relative flex w-full h-screen overflow-hidden">
      <ToastContainer/>
      {loader && <Loader/>}
      <div
        className={`fixed lg:z-20 top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
          isLogin ? "left-1/2" : "left-0"
        }`}
      >
        <img
          className="w-full h-full object-cover z-100"
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
          alt="Background"
        />
      </div>

      <div
        className={`flex items-center justify-center ${isLogin?"w-screen z-70":"w-0"} lg:w-1/2 h-full bg-gradient-to-br from-blue-100 via-white to-blue-200`}
      >
        <div className="flex flex-col items-center justify-center bg-white shadow-2xl rounded-3xl p-10 lg:w-[400px]">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-8">
            Welcome Back !
          </h1>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col text-left">
              <label className="text-lg font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                onChange={(e)=>{setusernamelog(e.target.value)}}
                id="usernamelog"
                placeholder="Enter your username"
                className="border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-lg font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                onChange={(e)=>{
                  setpasswordlog(e.target.value)
                }}
                id="passwordlog"
                placeholder="Enter your password"
                className="border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button onClick={()=>{
              handleLogin();
            }} className="cursor-pointer mt-6 bg-blue-600 text-white py-2 rounded-lg text-xl font-semibold transition-all duration-300 hover:bg-blue-700 hover:scale-105">
              Sign In
            </button>
          </div>

          <p className="mt-6 text-gray-600 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => {
                setIsLogin(false)
                document.getElementById("usernamelog").value='';
                document.getElementById("passwordlog").value='';

                setusernamelog('');
                setpasswordlog('');
              }}
              className="text-blue-500 font-medium hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      <div
        className={`absolute right-0 flex items-center ${isLogin?"w-0":"w-full"} justify-center lg:w-1/2 h-full bg-gradient-to-br from-blue-100 via-white to-blue-200`}
      >
        <div className="flex flex-col items-center justify-center bg-white shadow-2xl rounded-3xl p-10 lg:w-[450px] w-[350px]">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-8">
            Create Account
          </h1>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col text-left">
              <label className="text-lg font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullname"
                onChange={(e)=>{
                  setfullname(e.target.value)
                }}
                type="text"
                placeholder="Enter your full name"
                className="border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-lg font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                onChange={(e)=>{
                  setemail(e.target.value)
                }}
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-lg font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                onChange={(e)=>{
                  setusername(e.target.value)
                }}
                type="text"
                placeholder="Choose a username"
                className="border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-lg font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                onChange={(e)=>{
                  setpassword(e.target.value)
                }}
                type="password"
                placeholder="Create a password"
                className="border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button onClick={()=>Register()} className="cursor-pointer mt-6 bg-blue-600 text-white py-2 rounded-lg text-xl font-semibold transition-all duration-300 hover:bg-blue-700 hover:scale-105">
              Sign Up
            </button>
          </div>

          <p className="mt-6 text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => {
                setIsLogin(true)
                document.getElementById("username").value='';
        document.getElementById("email").value='';
        document.getElementById("fullname").value='';
        document.getElementById("password").value='';
        setfullname('');
        setemail('');
        setusername('');
        setpassword('');
              }
              }
              className="text-blue-500 font-medium hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
