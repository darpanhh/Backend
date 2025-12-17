
// console.log(faker.animal.type());
// console.log(faker.person.sex());
// console.log(faker.person.jobTitle());



// console.log(getRandomUser());
// import { faker } from '@faker-js/faker';
// import mysql from 'mysql2';
// const express = require('express');
// const app = express();
// let port = 8080;

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Darpanmysql123@', // 👈 add this
//   database: 'delta_app'
// });
// // let q = "SHOW TABLES";
// // let q = "INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)";
// let q = "INSERT INTO user (id,username,email,password) VALUES ?";
// // let user = ['123','123_newuser','abc@gmail.com','abc'];

// // let users = [
// //   ['123b','123_newuserb','abc@gmail.comb','abcb'],
// // ['123c','123_newuserc','abc@gmail.comc','abcc']

// // ];
// const getRandomUser = () => {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// };
// let data = [];
// // for(let i =1;i<=100;i++){
// //   data.push(getRandomUser()) ;//100 fake users
// // }
// try{
//     connection.query(q,[data],(err,result)=>{
//     if(err) throw(err);
//     console.log(result);
//     console.log(result.length);
//     console.log(result[0]);
//     console.log(result[1]);
// });
// } catch(err){
//     console.log(err)
// }

// connection.end();

// app.listen("8080",()=>{
//   console.log("Server is listening to the port 8080.");
// })


import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2';
import { faker } from '@faker-js/faker';
import methodOverride from 'method-override';

const app = express();
const port = 8080;

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Darpanmysql123@', // 👈 add this
  database: 'delta_app'
});
// let q = "SHOW TABLES";
// let q = "INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)";
let q = "INSERT INTO user (id,username,email,password) VALUES ?";
// let user = ['123','123_newuser','abc@gmail.com','abc'];

// let users = [
//   ['123b','123_newuserb','abc@gmail.comb','abcb'],
// ['123c','123_newuserc','abc@gmail.comc','abcc']

// ];
const getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
// let data = [];
// for(let i =1;i<=100;i++){
//   data.push(getRandomUser()) ;//100 fake users
// }


app.get('/',(req,res)=>{
  let q = `SELECT count(*) FROM user`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      // console.log(result[0]['count(*)']);
      let count = result[0]['count(*)'];
      res.render('home.ejs',{count});
    })
  } 
  catch(err){
    console.log(err);
    res.send("Some error in DB.");
  }
})
app.get('/user',(req,res)=>{
  let q = `SELECT * FROM user`;
  try{
    connection.query(q,(err,users)=>{
      if(err) throw err; 
      // let data = result;
      // console.log(data);
      // res.send(data);
      res.render('users.ejs',{users});
    })
  }
  catch(err){
    console.log(err);
    res.send("Some error in DB.");

  }

});
//Edit
app.get('/user/:id/edit',(req,res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  console.log(id);
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      // console.log(result);
      let user = result[0];
      res.render("edit.ejs",{user});
    })
  }
  catch(err){
    res.send("Some error in db.");
  }
})
//Update DB
app.patch('/user/:id',(req,res)=>{
  let {id} = req.params;
  let {username:newUsername,password:formPass} = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  // console.log(id);
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let user = result[0];
      if(formPass!=user.password){
        res.send("WRONG PASSWORD");
      }
      else{
        let q2 = `UPDATE user SET username= '${newUsername}' WHERE id = '${id}'`;
        connection.query(q2,(err,result)=>{
          if(err) throw err;
          res.redirect('/user');
      });
      
    }
  });
}catch(err){
    console.log(err);
    res.send("Some error in db.");
  }
})

app.listen("8080",()=>{
  console.log("Server is listening to the port 8080.");
})











// console.log(data);

// import { faker } from '@faker-js/faker';
// import mysql from 'mysql2/promise';

// async function main() {
//   try {
//     const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'Darpanmysql123@',
//       database: 'delta_app'
//     });

//     const [tables] = await connection.query("SHOW TABLES");
//     console.log(tables);

//     // Example: generate a random user
//     const getRandomUser = () => ({
//       id: faker.string.uuid(),
//       username: faker.internet.username(),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//     });

//     const user = getRandomUser();
//     console.log(user);

//     await connection.end(); // close connection
//   } catch (err) {
//     console.error(err);
//   }
// }

// main();
// PS C:\Users\Dell\OneDrive\Desktop\Backend\Day 8> & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
// >>
// Enter password: ***************
// Welcome to the MySQL monitor.  Commands end with ; or \g.
// Your MySQL connection id is 49
// Server version: 8.0.44 MySQL Community Server - GPL

// Copyright (c) 2000, 2025, Oracle and/or its affiliates.

// Oracle is a registered trademark of Oracle Corporation and/or its
// affiliates. Other names may be trademarks of their respective
// owners.

// Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

// mysql> SHOW DATABASES;
// +--------------------+
// | Database           |
// +--------------------+
// | delta_app          |
// | information_schema |
// | mysql              |
// | performance_schema |
// | sakila             |
// | sys                |
// | world              |
// +--------------------+
// 7 rows in set (0.10 sec)

// mysql> USE delta_app;
// Database changed
// mysql> SHOW TABLES;
// +---------------------+
// | Tables_in_delta_app |
// +---------------------+
// | temp                |
// +---------------------+
// 1 row in set (0.05 sec)

// mysql>