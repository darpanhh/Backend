class Mammal{
    constructor(name){
        this.name = name;
        this.type = 'warm-blooded';
    }
    eat(){
        console.log("I am eating");
    }
}

class Dog extends Mammal{
    constructor(name){
        super(name);
    }
    bark(){
        console.log('wooff..');
    }
    eat(){
        console.log('Dog is eating');//override the parent eat function
    }
}
class Cat extends Mammal{
    constructor(name){
        super(name);
    }
    meow(){
        console.log('meow..');
    }
}





