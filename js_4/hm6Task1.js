"use strict";

// 1. Цикл for..of в массиве

const arrayOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const finalResult = []
mathInCycle()
function mathInCycle(){
    for (let number of arrayOfNumbers){
        if(number % 2 === 0){
            finalResult.push(number ** 2)
        }
        else {
            finalResult.push(number **  3)
        }
    }
    console.log(finalResult)
}
separateLogs()

// 2. Методы массивов

const arrOfNumbers = [1, 2, 3, 4, 5]
function methodsArray(){
    arrOfNumbers.push(6)
    arrOfNumbers.unshift(0)
    arrOfNumbers.splice(2,1)
    arrOfNumbers.pop()
}
methodsArray()
console.log(arrOfNumbers)
separateLogs()

// 3. Деструктуризация массивов

const arrNumbers = [1, 2, 3, 4, 5]
const [first, second, ...rest] = arrNumbers
console.log(first)
console.log(second)
console.log(rest)
separateLogs()

// 4. Конкатенация массивов
const numbers = [1, 2, 3, 4, 5]
const numbers2 = [6, 7, 8, 9, 10]
const mergedArray = [...numbers, ...numbers2]
console.log(mergedArray)



function separateLogs(){
    console.log(`----------- Next hm ---------------`)
};