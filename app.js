const express = require("express");
const path =require("path");
const app =express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
mongoose.connect('mongodb://localhost:27017/join');
}
const port=80;

// define schema 

const joinschema = new mongoose.Schema({
    name: String,
    age: String,
    number: String,
    gender: String,
    email: String,
    address: String,
  });

const join = mongoose.model('join', joinschema);  


//EXPRESS SPCIFIC STUFF
app.use("/static",express.static("static"));//for serving static file
app.use(express.urlencoded())

//PUG SPCIFIC STUFF
app.set('view engine', 'pug')//set the template engine as pug 
app.set("views",path.join(__dirname,"views"))//set  the views directory

//ENDPOINT
app.get("/",(req,res)=>{
    const params ={ }
    res.status(200).render("home.pug",params)
})
app.get("/join",(req,res)=>{
    const params ={ }
    res.status(200).render("join us.pug",params)
})
app.post("/join",(req,res)=>{
    var myData =new join(req.body);
    myData.save().then(()=>{
        res.send("this is data is has been saved succefully to the database")
    }).catch(()=>{
        res.status(404).send("this data has been not saved in database")
    }) 
    // res.status(200).render("join us.pug",params)
})

//START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully ${port}`);
});  



