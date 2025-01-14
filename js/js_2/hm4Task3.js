"use strict";

const minAge = 18
const maxAge = 60
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function controlAge(age){
    if (parseInt(age) in numbers || !isNaN(age)){
        if (age < minAge) {
            console.log(`You don't have access, 'cause your age is ${age}, and it's less than ${minAge}`)
        }
        else if (age >= minAge && age < maxAge){
            console.log("Welcome!")
        }
        else if (age > maxAge) {
            console.log("Keep calm and look Culture channel")
        }
        else {
            console.log("Technical work")
        }
    }
    else {
        console.log("Incorrect data type")
    }
}
controlAge("55a")
controlAge("2")
controlAge("age")
controlAge(10)
controlAge(17)
controlAge(18)
controlAge(19)
controlAge(59)
controlAge(60)
controlAge(61)
