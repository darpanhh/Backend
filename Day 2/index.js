const express = require('express');
app = express();

// console.dir(app);
let port = 8080;

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
});

// app.use((req,res)=>{
//     // console.log(req);
//     console.log("Request received");
//     // res.send("This is a basic response");
//     // res.send({
//     //     name:'apple',
//     //     color:'red'
//     // })
//     let code = "<h1>Fruits</h1> <ul><li>Mango</li><li>Orange</li></ul>"
//     res.send(code)
// });
// app.get('/',(req,res)=>{
//     res.send("Welcome to root page");
// })
// app.get('/apple',(req,res)=>{
//     res.send("This is a apple path");
// })
// app.get('/orange',(req,res)=>{
//     res.send("This is a orange path");
// })
// app.post('/',(req,res)=>{
//     res.send("you sent a post request to root");
// })
// // 404 handler (catches all methods: GET, POST, etc.)
// app.use((req, res) => {
//     res.status(404).send('This path does not exist');
// });
// app.get("*", (req, res) => {
//     res.send('This path does not exist');
// })this is an older method 


app.get("/:username/:id",(req,res)=>{
    let {username,id} = req.params;
    let htmlStr = `<h1>Welcome to the page of @${username}!</h1>`;
    res.send(htmlStr);
    // console.log(req.params);
    // res.send("Hello, i am root");
})

app.get("/search",(req,res)=>{
    // console.log(req.query);
    let {q} = req.query;
    if(!q){
        res.send("<h1>Nothing searched</h1>")
    }
    res.send(`<h1>Search results for query: ${q}</h1>`);
})



