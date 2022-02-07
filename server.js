const http = require('http');
const express = require('express');
const yup = require('yup');
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose
.connect('mongodb://localhost:27017/fm_mongoose')
.catch(error => console.log(error));

const emailSchema = yup.string().email().required();

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
      type:String,
      required:true,
      validate:{
        validator:(v)=>emailSchema.isValid(v)
      } 
    },
    age: {
      type: Number,      
      validate:{
        validator: (v)=>v>0
      } 
    }
  }
});

const commentsSchema = new Schema({
  title:{
    type: String,
    required:true
  },
  taskLink: {
    type: Schema.Types.ObjectId, ref: 'Task'
  }
})




const Task = mongoose.model('Task', tastSchema);
const Comment = mongoose.model('Comment', commentsSchema);


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
const updateMehtod = async (req,res,next)=>{
  try{
    const {body, params:{taskId}}= req;
    const updatedTask = await Task.findOneAndUpdate({_id:taskId}, body,{returnDocument:'after'});
    res.status(200).send(updatedTask);
  }catch(error){
    next(error);
  }
}
const deleteTask = async (req,res,next)=>{
  try{
    const {params:{taskId}}= req;
    const deleteTask = await Task.findByIdAndRemove(taskId);
    if(deleteTask){
      res.status(200).send(deleteTask)
    }
    res.status(404).send();
  }catch(error){
    next(error);
  }
}


const app = express();
app.use(express.json());
app.post('/', postMethod);
app.get('/', getMethod);
app.patch('/:taskId', updateMehtod)
app.delete('/:taskId', deleteTask);





const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{console.log("Server started at port " + PORT)});
