const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const bcrypt = require('bcrypt');
dotenv.config();
const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const uri = `mongodb+srv://vihargandhi317:${process.env.password}@tododb.egxix9j.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));
const Schema = mongoose.Schema;

const todoschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    }
})
const todosignupmodel = mongoose.model('todoschema',todoschema)
app.post("/register",async function(req,res){
    const {email,Username,password} = req.body
    saltrounds = 10
    bcrypt.hash(password,saltrounds, async function(err, hashedPassword) {
        if (err) {
          console.error(err);
          return;
        }
     
        try{
            const newg = new todosignupmodel({
                email:email,
                username:Username,
                password:hashedPassword
            })
            await newg.save();
            res.status(201).json(newg);
    
        }catch(err)
        {
            res.status(400).json({ message:err.message});
    
        }
      
      });
   


})
const todolistschema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    todo:{
        type: [Schema.Types.Mixed],
        default: []
    },
   
})
const Todo = mongoose.model('Todo', todolistschema);

app.post("/additems",async function(req,res){
    const {email,todo} = req.body
   
    const user = await Todo.findOne({email:email})
    
    try{
        if(!user){
            const newuser = new Todo({
                email:email,
                todo:todo,
                
            })
            await newuser.save()
            res.status(201).json(newuser);
        }
        if(user){
            await Todo.updateOne({ email: email }, { $push: { todo: todo } });
            res.status(201).json(todo);
        }
    }catch(err){
        res.status(400).json({ message:err.message});
    }
   
    //await MyModel.updateOne({ email: userEmail }, { $push: { todo: newTodoItem } });
})
app.get("/getallitems",async(req,res)=>{
    const {email} = req.query
   
    try {
        const todos = await Todo.find({ email: email });
      
        res.status(201).json({array: todos[0],listarr:todos[0].todo});
       
      } catch (err) {
        console.error(err);
        res.status(400).json({ message:err.message});
      }

})
app.post("/updatestatus",async (req,res)=>{
    const {email,task} = req.body
    await Todo.updateOne({ email: email, "todo.newtask": task},
    { $set: { "todo.$.completed": true } })
    const user  = await Todo.find({ "todo.newtask": task })
    
     
})
app.post("/deleteone",async(req,res)=>{
    const {email,task} = req.body
    console.log(task)
   await Todo.updateOne(
        { email: email},
        { $pull: { todo: { newtask:task } } }
      )
    const todos = await Todo.find({ email: email }); 
    

})
app.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user  = await todosignupmodel.findOne({email:email})
    if(!user)
    {
        res.status(400).json({ message:"Email Doesnt exist"});
        return
    }
    const ismatch = await bcrypt.compare(password,user.password);
    if (ismatch) {
        res.status(201).json({Username:user.username,email:user.email});
      } else {
        res.status(400).json({ message: "Invalid email or password" });
      }
})
app.listen(PORT,function(){
    console.log(`Server running at port ${PORT}`)
})