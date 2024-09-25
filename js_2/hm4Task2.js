"use strict";

// 1. Создать переменную 'minAge' и присвоить ей значение 18
// 2. Создать переменную 'maxAge' и присвоить ей значение 60
// 3. Создать переменную 'age', в которую вы будете вводить возраст при выполнении программы
// 4. Добавьте проверку: если тип данных в переменной age не number - вывести в консоль "Incorrect data type"
// 4. Создать if, в котором будете проверять весь код переменной ageсо следующими услвоиями:
// - Если age меньше чем minAge, вывести в консоль "You don't have access cause your age is " + "age" + "it's less then"  + "minAge"
// - Если age больше либо равно minAge и меньше maxAge, вывести в консоль "Welcome"
// - Если age больше maxAge, вывести в консоль "Keep calm and look Culture channel"
// - Иначе выводите "Technical work"
// 5. Проверить задание со следующими значениями в переменной age: 10, 17, 18, 19, 59, 60, 61

const minAge = 18
const maxAge = 60

function controlAge(age){
    if (typeof age != "number"){
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
