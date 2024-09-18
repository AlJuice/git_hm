"use strict";

// Преобразовать task 2 таким образом, чтобы значение например "2" 
// (т.е любая строка в которой лежат только цифры) пропускалось, преобразовываясь в number

const minAge = 18
const maxAge = 60
let age
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function controlAge(age){
    if (parseInt(age) in numbers || typeof age == "number"){
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
    else if (typeof age != "number"){
        console.log("Incorrect data type")
    }
}

controlAge("2")
controlAge("age")
controlAge(10)
controlAge(17)
controlAge(18)
controlAge(19)
controlAge(59)
controlAge(60)
controlAge(61)
