
// 

// console.log(faker.animal.type());
// console.log(faker.person.sex());
// console.log(faker.person.jobTitle());



// console.log(getRandomUser());
import { faker } from '@faker-js/faker';
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Darpanmysql123@', // 👈 add this
  database: 'delta_app'
});
let q = "SHOW TABLES";
try{
    connection.query(q,(err,result)=>{
    if(err) throw(err);
    console.log(result);
    console.log(result.length);
    console.log(result[0]);
    console.log(result[1]);
});
} catch(err){
    console.log(err)
}

connection.end();
const getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
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