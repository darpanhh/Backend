const express = require('express');
const app = express();
const path = require('path');

let port = 8080;

app.listen(port,()=>{
    console.log(`App is listening to the port ${port}`);
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"/views"));

app.get('/',(req,res)=>{
    res.render('home.ejs');
}) 
app.get('/hello',(req,res)=>{
    res.send("Hello");
})
app.get('/rolldice',(req,res)=>{
    let diceVal = Math.floor(Math.random()*6)+1;
    // res.render('rolldice.ejs',{num:diceVal});
    // res.render('rolldice.ejs',{diceVal:diceVal});
    res.render('rolldice.ejs',{diceVal});
})
// app.get('/ig/:username',(req,res)=>{
//     const followers = ['adam','bob','steve','billgates'];
//     let {username} = req.params;
//     res.render('instagram.ejs',{username,followers});
//     // console.log(username);
// })
app.get('/ig/:username',(req,res)=>{
    let {username} = req.params;
    const instaData = require('./data.json');
    const data = instaData[username];
    if(data){
        res.render('instagram.ejs',{data});
    }
    else{
        res.render('error.ejs');
    }
    // console.log(data);
    // console.log(instaData);
    
    // res.render('instagram.ejs',{data: instaData});
    // console.log(username);
})