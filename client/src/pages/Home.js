import React, { useContext,useEffect,useState } from 'react';
import useName from '../Helping/Context';
import UserContext from '../Helping/Context';
import { FaTrash, FaPlus } from "react-icons/fa";
import './Home.css'
import axios from 'axios';
function Home() {
  const  user= useContext(UserContext)
  
  const [task,setTask] = useState({newtask:'',completed:''})
  const [todos, setTodos] = useState([]);
  const [arr,  setfirstarray] = useState([])
  const [targetedvalue,setTargetdvalue] = useState('')
  const handleclickcheck = async (e)=>{
    setTargetdvalue(e.target.value)
    let newform ={
      email:user.emailn,
      task:e.target.value
    }
    const respone = await axios.post("http://localhost:3001/updatestatus",newform)
  }
  const handleClickdelete = async (e, newtask) => {
    e.preventDefault()
    let newform  = {
      email:user.emailn,
      task:newtask
    }
    const response = await axios.post("http://localhost:3001/deleteone",newform)
    setTodos(response.data.listarr)
  }
  const handleClick = async(e)=>{
    e.preventDefault()
              try{
                let newform  = {
                  email:user.emailn,
                  todo:task
                }
                const response = await axios.post('http://localhost:3001/additems',newform)
                if(todos.length===0){
                  setfirstarray([response.data.todo[0]])

                }
                setTask({newtask:'',completed:''})
               
                  
                
             
                

              }catch(error){
                console.log(error)
              }
  }
  useEffect(()=>{
   const getinfo = async()=>{
    const response = await axios.get("http://localhost:3001/getallitems", { params: { email: user.emailn } });
    
    
    setTodos(response.data.listarr)
    
   }
   getinfo()
  },[todos,user.emailn,arr])
  return (
    
    <div className="flex flex-col h-screen bg-gray-100 justify-center items-center">
      <h1 className="text-4xl mt-8 mb-4">Welcome {user.usern}</h1>
      <h1 className="text-4xl mb-4">TodoList</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-4">
          <ul className="list-disc list-inside">
            {todos.map((todo) => (
              <li
               
                className={`${
                  todo.completed ? "line-through text-gray-400" : ""
                } bg-green-50 rounded-lg p-4 flex items-center justify-between mb-2`}
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-500"
                    value={todo.newtask}
                    onClick={handleclickcheck}
                    
                  />
                  <span className="ml-2 text-lg">{todo.newtask}</span>
                </label>
                <button
  className="text-red-500 hover:text-red-700"
  value={todo.newtask}
  onClick={(e) => handleClickdelete(e, todo.newtask)}
>
  <FaTrash />
</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <form className="flex" action="#" method="POST">
            <input
              type="text"
              name="new_todo"
              placeholder="Add new todo"
              value = {task.newtask}
              onChange={e =>{
                setTask({newtask:e.target.value,completed:false})
                
              }}
              className="flex-1 mr-2 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
//<div className="flex mb-10 justify-center items-center flex-col w-full">