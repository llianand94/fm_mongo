const http = require('http');
const express = require('express');
const yup = require('yup');
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose
.connect('mongodb://localhost:27017/fm_mongoose')
.catch(error => console.log(error));

const tastSchema = new Schema({
  title: {
    type: String, 
    require: [true, "Task have to be"],
    validate:{
      validator: (v)=>/[A-Z][a-z\s]{4,200}/.test(v),
      message: '{VALUE} must be letter'
    }
  },
  date: { type: Date, default: Date.now },
  isDone: { type: Boolean, default: false },
  author: {
    name:{
      type: String, 
      require: true
    },
    email:{
      validate: yup.string().email().required()
    },
    age: {
      type: Number,
      default:null,
      validate:{
        validator: (v)=>v>0
      } 
    }
  }
});



const Task = mongoose.model('Task', tastSchema);

const getMethod = async (req,res,next)=>{
  try{
    const tasks = await Task.find();
    res.status(200).send(tasks);
  }catch(error){
    next(error);
  }
};
const postMethod = async (req,res,next)=>{
  try{
    const {body} = req; 
    const newTask = await Task.create(body);
    res.status(201).send(newTask);
  }catch(error){
    next(error);
  }
}

const app = express();
app.use(express.json());
app.post('/', postMethod);
app.get('/', getMethod);


const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{console.log("Server started at port " + PORT)});
