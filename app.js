var express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); //import uuid

const app = express();
app.use(express.json());

//connecting mongodb

mongoose.connect("mongodb://localhost:27017/expense").then(() => {
  console.log("Connected to database");
});

//construction of schema
const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true }, //required true makes it a mandatory only then data will be created
  amount: { type: Number, required: true },
});

//construction of model
const Expenses = mongoose.model("Expenses", expenseSchema);

//POST method creation

app.post("/api/expenses", async (req, res) => {
  console.log(req.body);
  const { title, amount } = req.body;
  try {
    const newExpense = new Expenses({
      id: uuidv4(), //everytime new unique id would be generated as given below
      title: title, //same as giving it just as title
      amount: amount,
    });
    const savedExpense = await newExpense.save(); //using await to make sure that we get a response only after insertion of data
    res.status(200).json(savedExpense);
  } catch (err) {
    res.status(500).json({ message: "Error in creating expense" });
  }
});

//GET method creation

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expenses.find(); //this is a promise so we are using await for which the fn has to be async
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error in creating expense" });
  }
});

//GET method to fetch one single id
app.get("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expenses.findOne({ id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching expenses" });
  }
});

//  PUT method

app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  try {
    const updateExpense = await Expenses.findOneAndUpdate(
      { id },
      { title, amount },
    );
    if (!updateExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json({ title, amount });
  } catch (err) {
    res.status(500).json({ message: "Error in updating expense" });
  }
});
//DELETE

app.delete("/api/expenses/:id",async(req,res)=>{
    const {id}=req.params
    try{
        const deleteExpense= await Expenses.findOneAndDelete({id});
        if(!deleteExpense){
            return res.status(400).json({message:"Expense not found"});
        }
        res.status(200).json({message:"Expense deleted"});
    }
    catch(err){
        res.status(500).json({message:"Error in deleting expense."});
    }
});

//to specify in which port the app runs
app.listen(3000, () => {
  console.log("Server is running in  http://localhost:3000");
});

// const students=[{
//     name:"Suriya",
//     age:25,
//     rollno:1
// },{
//     name:"Rahul",
//     age:25,
//     rollno:2
// }]

//GET methods
/*
app.get("/api/sayhello",(req,res)=>{
    res.send("Hello World");
    res.end();
})
app.get("/api/students",(req,res)=>{
    res.status(200).json(students);
})
app.get("/api/students/:rollno",(req,res)=>{
    const{rollno}=req.params;
    const student=students.find((student)=>student.rollno==rollno);
    if(!student){
        res.status(404).send("Student not found");
    }
    else{
        res.status(200).json(student);
    }
})
*/
