const express = require("express");
const app = express();
const port = 8080;
const path = require('path');
const { v4:uuidv4 } = require("uuid");
const methodOverride = require('method-override');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [{
    id:uuidv4(),
    username: "apnacollege",
    content: "I love coding!"
},
{
    id:uuidv4(),
    username:"Darpangiri",
    content:"Hardwork is the key to success"
},
{
    id:uuidv4(),
    username:"Rahul Kumar",
    content:"I got selected for my first internship"
}];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get('/posts/new',(req,res)=>{
    res.render("new.ejs");
})

app.post('/posts',(req,res)=>{
    // console.log(req.body);
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect('/posts');
    // res.send("POST Request working");
})

app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render('show.ejs',{post});
    // console.log(post);
    // res.send("Request working");
})
app.patch('/posts/:id',(req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let newContent = req.body.content;
    let post = posts.find((p)=> id ===p.id);
    post.content = newContent;
    console.log(post);
    // console.log(newContent);
    // res.send("patch request working");
    res.redirect('/posts');
})
app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render('edit.ejs',{post});
})
app.delete('/posts/:id',(req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect('/posts');
    // res.send("Delete successfully");
});
app.listen(port,()=>{
    console.log(`app is listening to the port ${port}`);
});