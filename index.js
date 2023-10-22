
const  express = require('express')
const path = require("path")
const bp=require('body-parser')
const mongoose= require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/MYdata")
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log("failed to connect");
})

const LogInSchema= new mongoose.Schema({
    Username : {
        type:String,
        required : true
    }, 
    Email : {
        type:String,
        required : true
    }, 
    password : {  
        type:String,
        required : true
    }
})

const collection = new mongoose.model("mycollects",LogInSchema);
module.exports = collection;
const port = process.env.PORT || 3000
const app=express()

app.use(express.json())
app.use(bp.urlencoded({extended:true}))
app.use(bp.json());
app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/my.html');
});
app.get('/login', function(req, res){
    res.sendFile(__dirname+'/my.html');
});



app.post("/signup",function(req,res){
    const data = {
        Username : req.body.username,
        Email : req.body.email,
        password : req.body.password
    };
    console.log(data);
    
    
    collection.insertMany([data]);
    res.send("success");
        
        
   


    
})


app.post("/login",function(req,res){
    const data = {
        Email : req.body.email,
        password : req.body.password
    };
    let pnt=true;
    collection.find().then(function(data1){
        console.log(data1.length);
        for(let i=0;i<data1.length;i++){
            console.log(data1, data1[i]);
            
            if (data1[i].Email==req.body.email){
                let pnt=false;
                console.log(data1[i].Email,req.body.email);
                console.log(data1[i].password, req.body.password);
                if(data1[i].password==req.body.password){
                    res.send("Successful Login!!")
                }
                else{
                    res.send("wrong password")
                }
                
            }
            
    }
    if(pnt==true){
        res.send("wrong credentials")
    }
    
})
})





app.listen(3000,()=>{
    console.log("port connected");
})
