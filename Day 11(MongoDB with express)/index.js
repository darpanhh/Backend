const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');


main()
.then(()=>{
    console.log("Connection successful");
})
.catch(err => console.log(err));


app.set("views",path.join(__dirname,"views"));
app.set("view engine",'ejs');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
 

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get('/chats',async(req,res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render('index.ejs',{chats})
})

app.get('/',(req,res)=>{
    res.send("Root is working");
})

app.get('/chats/new',(req,res)=>{
    res.render('form.ejs');
})

app.post('/chats',(req,res)=>{
    let {from,msg,to} = req.body;
    let newChat = new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date()
    });
    newChat.save()
    .then((res)=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect('/chats');
    
})

//Edit route
app.get('/chats/:id/edit',async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs',{chat})
})
//Update route
app.put('/chats/:id',async(req,res)=>{
    let {id} = req.params;
    let {msg:newMsg} = req.body;
    console.log(newMsg )
    let updatedChat = await Chat.findByIdAndUpdate(id,
        {msg:newMsg},
        {
            runValidators:true,new:true
        })
    console.log(updatedChat);
    res.redirect('/chats');
})

//Delete Route

app.delete('/chats/:id',async(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats');

})



app.listen(8080,()=>{
    console.log("App is listening to the port 8080")
})