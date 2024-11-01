"use strict";
  
separateLogs(1)

const num1: number = 42
const str: string = "Hello, TypeScript!"
const isComplete: boolean = true
const numbers: number[] = [1, 2, 3, 4, 5]
const cities: string[] = ["Minsk", "Warsaw", "London"]
const person: object = { name: "Alice", 
                         age: 30, 
                         city: "Minsk"}

separateLogs(2)

type User = {
    name: string,
    age: number,
    email?: string
}

type Grade = 'junior' | 'middle' | 'senior'

separateLogs(3)

interface ICar {
    brand: string,
    model: string,
    year?: number
}

separateLogs(4)

interface IAddress {
    street: string,
    city: string,
    zipCode: number
}

interface IFullAddress extends IAddress {
    country: string
}

separateLogs(5)

type Product = {
    id: number,
    name: string,
    price: number
}

type DiscountedProduct = Product & {
    discount: number
}

separateLogs(6)

const product: DiscountedProduct = {
id: 1,
name: "Laptop",
price: 1000,
discount: 10
};

function calculateDiscount(object: DiscountedProduct): number {
    return object.price - (object.price * (object.discount / 100))
}

console.log(calculateDiscount(product)); 


function separateLogs(num: number){
console.log(`\n----------- HomeWork ${num} ---------------\n`)
};