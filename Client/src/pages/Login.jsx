import React, { useState } from "react";
import axios from "axios";
const Register = async function(){
    // Registration logic here
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log({fullname,email,username,password});
    try{
        const res=await axios.post("http://localhost:3000/users/register",{username,email,password,fullname});
        alert(res.data.message);
        console.log(res.data);
    }catch(error)
    {
        console.error('Error registering user:', error);
        alert(error.response.data.message||"Registration Failed");
    }
}

const handleLogin = async function(){
  const username = document.getElementById("usernamelog").value;
  const password = document.getElementById("passwordlog").value;
  console.log({username,password});
  try{
    const res = await axios.post("http://localhost:3000/users/login",{username,password});
    alert(res.data.message);
    console.log(res.data);
  }catch(error){
    console.log("Error Logging In");
    alert(error.response.data.message || "Login Failed");
  }
  
}
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative flex w-full h-screen overflow-hidden">
      {/* Background Image Section */}
      <div
        className={`absolute z-20 top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
          isLogin ? "left-1/2" : "left-0"
        }`}
      >
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
          alt="Background"
        />
      </div>

      {/* LOGIN FORM */}
      <div
        className={`flex items-center justify-center w-1/2 h-full bg-gradient-to-br from-blue-100 via-white to-blue-200`}
      >
        <div className="flex flex-col items-center justify-center bg-white shadow-2xl rounded-3xl p-10 w-[400px]">
          <h1 className="text-4xl font-bold text-blue-600 mb-8">
            Welcome Back 👋
          </h1>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col text-left">
              <label className="text-lg font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
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
                id="passwordlog"
                placeholder="Enter your password"
                className="border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button onClick={()=>{
              handleLogin()
            }} className="mt-6 bg-blue-600 text-white py-2 rounded-lg text-xl font-semibold transition-all duration-300 hover:bg-blue-700 hover:scale-105">
              Sign In
            </button>
          </div>

          <p className="mt-6 text-gray-600 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => setIsLogin(false)}
              className="text-blue-500 font-medium hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/* SIGNUP FORM */}
      <div
        className={`absolute right-0 flex items-center justify-center w-1/2 h-full bg-gradient-to-br from-blue-100 via-white to-blue-200`}
      >
        <div className="flex flex-col items-center justify-center bg-white shadow-2xl rounded-3xl p-10 w-[450px]">
          <h1 className="text-4xl font-bold text-blue-600 mb-8">
            Create Account ✨
          </h1>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col text-left">
              <label className="text-lg font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullname"
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
                type="password"
                placeholder="Create a password"
                className="border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button onClick={()=>Register()} className="mt-6 bg-blue-600 text-white py-2 rounded-lg text-xl font-semibold transition-all duration-300 hover:bg-blue-700 hover:scale-105">
              Sign Up
            </button>
          </div>

          <p className="mt-6 text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setIsLogin(true)}
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
