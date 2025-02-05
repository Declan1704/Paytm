const express = require("express");
const cors=require("cors");
const app=express();
const mongoose=require('mongoose')
app.use(cors());
app.use(express.json())
const mainRoute=require("./routes/index");


mongoose.connect("mongodb+srv://adrianodsilva590001:TaYCqme7qrN5Y18z@cluster0.ztv7a.mongodb.net/Paytm").then(()=>{
    console.log("Connected to mongodb")
})

app.use('/api/v1',mainRoute)

app.listen(3000)