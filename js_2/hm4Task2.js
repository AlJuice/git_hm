"use strict";

const minAge = 18
const maxAge = 60

function controlAge(age){
    if (isNaN(age)){ // проверяет, является ли аргумент числом, и если да, то проверяет, является ли оно NaN.
        console.log("Incorrect data type")
    }
    else {
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
}

controlAge("age")
controlAge("age18")
controlAge(10)
controlAge(17)
controlAge(18)
controlAge(19)
controlAge(59)
controlAge(60)
controlAge(61)
