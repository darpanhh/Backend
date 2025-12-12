const express = require('express');
const app = express();
const port = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json())//It is used if we send the data in json format otherwise we can ignore this
app.get("/register",(req,res)=>{
    let {username,password} = req.query;
    res.send(`standard GET response.Welcome ${username}`)
    // res.send("standard GET response");
})
app.post("/register",(req,res)=>{
    let {username,password} = req.body;
    // console.log(req.body);
    res.send(`standard POST response.Welcome ${username}`);
})

app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})

