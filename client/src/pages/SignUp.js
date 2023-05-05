import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUp() {
    const navigate = useNavigate()
    const handleclick1 = ()=>{
        navigate("/login")
    }
    const[Details,setDetails] = useState({email:'',Username:'',password:''});

    const handleclick = async(e)=>{
        e.preventDefault();
       
        try{
            const response = await axios.post("http://localhost:3001/register",Details)
            toast.success('Successfully registerd', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: true,
                pauseOnHover: false
              });
            navigate("/login")

        }catch(err){
            console.log(err)
             
            toast.error("Something Went Wrong Try again", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: true,
                pauseOnHover: false,
              });
        }
        
    }
  return (
    
    <div class="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
    <div class="relative py-3 sm:w-96 mx-auto text-center">
  
      <span class="text-2xl font-light ">SignUp</span>
      <div class="mt-4 bg-white shadow-md rounded-lg text-left">
        <div class="h-2 bg-purple-400 rounded-t-md"></div>
        <div class="px-8 py-6 ">
          <label class="block font-semibold"> Username </label>
          <input type="text" placeholder="username" value={Details.Username} onChange={(e)=>{
            setDetails({...Details,Username:e.target.value})
          
            
          }} class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"/>
          <label class="block font-semibold"> Email </label>
          <input type="text" placeholder="Email" value={Details.email} onChange={(e)=>{
            setDetails({...Details,email:e.target.value})
          
          }} class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"/>
          <label class="block mt-3 font-semibold">Password</label>
          <input type="password" placeholder="Password" value={Details.password} onChange={(e)=>{
            setDetails({...Details,password:e.target.value})
            
          }} class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"/>
            <div class="flex justify-between items-baseline">
              <button onClick={handleclick} class="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">SignUp</button>
              <a href="" onClick={handleclick1} class="text-sm hover:underline">Already havean account?login</a>
            </div>
        </div>
      </div> 
    </div>
  </div>
  


  )
}

export default SignUp