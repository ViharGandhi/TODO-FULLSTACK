import axios from 'axios'
import { set } from 'mongoose'
import React, { useEffect, useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../Helping/Context';
function Login() {
  const {usern, setuser} = useContext(UserContext)
  const{emailn,setemailn} = useContext(UserContext)
    const navigate = useNavigate()
    function handleclick1 ()
    {
        navigate("/")
    }
    const [Details,setDetails] = useState({email:'',password:''})
    const [user,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const userContext = useContext(UserContext);
    async function handleclick(e){
        e.preventDefault();
        
        try{
            const response = await axios.post("http://localhost:3001/login",Details)
            toast.success('Successfully Loggedin', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: true,
                pauseOnHover: false
              });
              setUsername(response.data.Username)
              setEmail(response.data.email)
           
             
             
              

              
                
              
              
              
            
            
              

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
    useEffect(()=>{
     
      setuser(user)
      setemailn(email)
      
      if(user!=='' && email!==''){
        navigate("/home")
      }
     
     
      
    },[user,email])

  return (
 
   
   
    <div class="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
    <div class="relative py-3 sm:w-96 mx-auto text-center">
      <span class="text-2xl font-light ">Login</span>
      <div class="mt-4 bg-white shadow-md rounded-lg text-left">
        <div class="h-2 bg-purple-400 rounded-t-md"></div>
        <div class="px-8 py-6 ">
          <label class="block font-semibold"> Email </label>
          <input type="text" placeholder="Email" value={Details.email} onChange={(e)=>{
            setDetails({...Details,email:e.target.value})
            
          }} class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"/>
          <label class="block mt-3 font-semibold">Password</label>
          <input type="password" placeholder="Password" value={Details.password} onChange={(e)=>{
            setDetails({...Details,password:e.target.value})
            
          }} class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"/>
            <div class="flex justify-between items-baseline">
              <button onClick={handleclick} class="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Login</button>
              <a href="#" onClick={handleclick1} class="text-sm hover:underline">Dont Have account?SignUp</a>
            </div>
        </div>
      </div> 
    </div>
  </div>
  
  )
}

export default Login
//wnttIZZaBotnw6j6