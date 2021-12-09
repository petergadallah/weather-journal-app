let projectData={}
var date;
var content;
var temp;
// Setup empty JS object to act as endpoint for all routes

// Require Express to run server and routes
const express=require('express');
const cors=require('cors')
const bodyParser=require('body-parser')

// Start up an instance of app
const app=express(); 

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=3000;
app.listen(port,listening)
function listening(){console.log(`the server works at port ${port}`)}
 
/*we receive data from the application*/
app.post('/date',postDate)
function postDate(req,res){
    
    res.send()
    projectData.date=req.body.date
}

app.post('/content',postContent)
function postContent(req,res){
    
    res.send()
    projectData.content=req.body.content
}

app.post('/temp',postTemp)
function postTemp(req,res){
    
    res.send()
    projectData.temp=req.body.temp
}

projectData = {date,temp,content};


app.get('/finaldata',sendFinalData)
function sendFinalData(req,res){
    res.send(projectData)
}  




