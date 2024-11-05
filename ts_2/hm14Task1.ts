"use strict";

interface IVehicle {
    getDetails(): string
    start(): string 
}

abstract class Vehicle implements IVehicle {
    constructor (protected make: string, protected model: string){}
    start() {
        return `The vehicle ${this.make} ${this.model} is starting.`
    }
    abstract getDetails(): string
}

class Car extends Vehicle {
    constructor(protected make: string, protected model: string, protected year: number) {
        super(make, model)
        this.year = year
    }
    getDetails(){
        return `${this.make} ${this.model}, ${this.year}`
    }

}

const myCar = new Car("Toyota", "Camry", 2022)
console.log(myCar.getDetails())
console.log(myCar.start())



