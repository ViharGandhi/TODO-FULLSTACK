
import './App.css';
import { Route,Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import UserContext from './Helping/Context';
import { useState } from 'react';

function App() {
  const[usern,setuser] =useState(null)
  const[emailn,setemailn] =useState(null)
  return (
    
    <UserContext.Provider value={{usern,setuser,emailn,setemailn}}>
    <div>
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/home' element={<Home/>}/>
     
    </Routes>
    <ToastContainer/>
    </div>
 
    </UserContext.Provider>
    
  );
}

export default App;
