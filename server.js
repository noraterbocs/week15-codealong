import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/projectweek15";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;
// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

const Task = mongoose.model('Tasks',{
  text:{
type:String,
required:true,
minlength:5
  },
  complete:{
type:Boolean,
default:false
  },
  createdAt:{
type:Date,
default:Date.now
  }
})

// const Person = mongoose.model('Person', {
//   name:{
//     type:String,
//     required:true,
//     minlength:2,
//     maxlength:500
//   },
//   height: {
//     type:Number,
//     required:true,
//     min:5
//   },
//   birthdate:{
//     type:Date,
//     default: Date.now()
//   },
//   text:String
// })

// new Person({name:"Nora2", height:165}).save();
// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// app.post('/people', async(req, res) => {
  // const { text } = req.body
  // const person = new Person (req.body)
  // const savedPerson = await person.save()
  // person.save()
  // res.send(person);


      //try and catch
//   try{
//   const person = await new Person(req.body).save()
//   // res.json(savedPerson)
//   res.status(200).json(person)
//   }catch(err){
// res.status(400).json({message: 'Could not save person', error:err})
//   }


      // promises

    //  new Person(req.body).save()
    //   .then((person)=>{
    //     res.status(200).json(person)
    //   })
    //   .catch((err)=>{
    //     res.status(400).json({message: 'Could not save perosn', error:err.errors })
    //   });
// });
app.get('/tasks', async(req, res)=>{
const tasks = await Task.find().sort({createdAt: 'desc'}).limit(20).exec()
res.json(tasks)
})
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.post('/tasks', async(req, res)=>{
  const { text, complete }= req.body
  const task = await Task({ text, complete })

try{
  const savedTask = await task.save()
res.status(200).json(savedTask)
}catch(err){
res.status(400).json({message: 'Failed', error:err })
}
})
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
