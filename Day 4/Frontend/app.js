// let arr=[1,2,3];
// let arr2=[1,2,3];
// arr.sayHello = ()=>{
//     console.log('Hello. I am arr');
// }
// arr2.sayHello = ()=>{
//     console.log('Hello. I am arr');
// }

// function PersonMaker(name,age){
//     const person = {
//         name:name,
//         age:age,
//         talk(){
//             console.log(`Hi,my name is ${this.name}`);
//         }
//     }
//     return person;
// }
// let p1 = PersonMaker('darpan',20);//copy
// let p2 = PersonMaker('ram',20);//copy

//Constructors-that doesn't return anything and start with capital letter
// function Person(name,age){
//     this.name = name;
//     this.age = age;
//     // console.log(this);
// }
// Person.prototype.talk = function(){
//     console.log(`Hi my name is: ${this.name}`);
// }
// class Person{
//     constructor(name,age){
//         this.name = name;
//         this.age = age;
//     }
//     talk(){
//         console.log(`Hi My name is ${this.name}`);
//     }
// }
// let p1 = new Person("Darpan",20);
// let p2 = new Person("Ram",20);



//Inheritance
class Person{
    constructor(name,age){
        console.log("Person class constructor");
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`Hi My name is ${this.name}`);
    }
}
class Student extends Person{
    constructor(name,age,marks){
        console.log("Student class constructor");
        // this.name = name;
        // this.age = age;
        super(name,age);//parent class constructor is being called.
        this.marks = marks;
    }
    // talk(){
    //     console.log(`Hi My name is ${this.name}`);
    // }
}
class Teacher extends Person{
    constructor(name,age,subject){
        super(name,age);//parent class constructor is being called.
        // this.name = name;
        // this.age = age;
        this.subject = subject;
    }
    // talk(){
    //     console.log(`Hi My name is ${this.name}`);
    // }
}