
// const express = require('express')
// const ExpressError = require('./ExpressError')
// const app = express()




// app.get('/random',(req,res)=>{
//     res.send("This is a random page")
// })

// const checkToken = (req,res,next)=>{
//     let {token} = req.query;
//     if(token === "giveaccess"){
//         next();
//     }
//     // res.send("ACCESS DENIED");
//     throw new ExpressError(401,"ACCESS DENIED!!");
// };

// app.get('/api',checkToken,(req,res)=>{
//     res.send("data");
// })

// app.get('/err',(req,res)=>{
//     abcd=abcd;
// })


// app.get('/admin',(req,res)=>{
//     throw new ExpressError(403,"Access to admin is forbidden")
// })

// app.use((err,req,res,next)=>{
//     let {status=500,message="Some Error occured"} = err;
//     res.status(status).send(message);
// })

// // app.use((err,req,res,next)=>{
// //     console.log("---------------ERROR2 Middleware-------------");
// //     next(err);
// // })

// // app.use((req,res)=>{
// //     res.status(404).send("Page not found");
// // })

// app.listen(8080,()=>{
//     console.log("App is listening to the port 8080")
// })



const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');
const ExpressError = require("./ExpressError");
const { linkSync } = require("fs");

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
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get('/chats',async(req,res,next)=>{
    try{
        let chats = await Chat.find();
    // console.log(chats);
    res.render('index.ejs',{chats})
    }
    catch(err){
        next(err);
    }
    
})

app.get('/',(req,res)=>{
    res.send("Root is working");
})
//New Route
app.get('/chats/new',(req,res)=>{
    // throw new ExpressError(404,"Page Not found")
    res.render('new.ejs');
})
//Create Route
app.post('/chats',async(req,res,next)=>{
    try{
    let {from,msg,to} = req.body;
    let newChat = new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date()
    });
    await newChat.save()
    // .then((res)=>{
    //     console.log("chat was saved");
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
    res.redirect('/chats');
    }catch(err){
        next(err);
    }
    
})
//New-Show Route
app.get('/chats/:id',async(req,res,next)=>{
    try{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
        next(new ExpressError(500,"Chat not found baby"));
    }
    res.render('edit.ejs',{chat});
    }
    catch(err){
        next(err);
    }
    
})

//Edit route
app.get('/chats/:id/edit',async(req,res,next)=>{
    try{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs',{chat})
    }
    catch(err){
        next(err);
    }

    
})
//Update route
app.put('/chats/:id',async(req,res)=>{
    try{
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
    }
    catch(err){
        next(err);
    }
})

//Delete Route

app.delete('/chats/:id',async(req,res)=>{
    try{
    let {id} = req.params;
    console.log(id);
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats');
    }
    catch(err){
        next(err);
    }

})
//Error Handling Middleware
app.use((err,req,res,next)=>{
    let {status=500,message="Some Error Occured"} = err;
    res.status(status).send(message);
})

app.listen(8080,()=>{
    console.log("App is listening to the port 8080")
})