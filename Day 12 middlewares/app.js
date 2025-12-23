const express = require('express')

const app = express()


// app.use((req,res,next)=>{
//     console.log("Hi, I am 1st middleware")
//     next();
// })

// app.use((req,res,next)=>{
//     console.log("Hi, I am 2nd middleware")
//     next();
// })


// app.use('/api',(req,res,next)=>{
//     let {token} = req.query;
//     if(token === "giveaccess"){
//         next();
//     }
//     res.send("ACCESS DENIED");
// })

const checkToken = (req,res,next)=>{
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }
    // res.send("ACCESS DENIED");
    throw new Error("ACCESS DENIED");
};

app.use('/random',(req,res,next)=>{
    console.log("I am only for random")
    next()
})

// app.get('/api',(req,res)=>{
//     res.send("data");
// })

app.get('/wrong',(req,res)=>{
    abcd=abcd;
})


app.get('/api',checkToken,(req,res)=>{
    res.send("data");
})
app.get('/random',(req,res)=>{
    res.send("This is a random page")
})

app.get('/',(req,res)=>{
    res.send("Welcome to middleware learning")
})
//logger- morgan
// app.use((req,res,next)=>{
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method,req.hostname,req.path,req.time);
//     next()
// })
//404
app.use((req,res)=>{
    res.status(404).send("Page not found");
})

app.listen(8080,()=>{
    console.log("App is listening to the port 8080")
})