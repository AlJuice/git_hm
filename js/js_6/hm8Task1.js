"use strict";

const arrOfNumber = [7, 8, 2, 30, 85, 95, 77, 94, 37, 31]

separateLogs(1)
arrOfNumber.forEach(el => el % 3 == 0 ? console.log(el) : null)

separateLogs(2)
const subtractArrayLength = arrOfNumber.map((el, index, array) => el - array.length)
console.log(subtractArrayLength)

separateLogs(3)
const biggerThanPrevious = arrOfNumber.filter((el, index, array) => {
    return array[index] > array[index - 1]
})
console.log(biggerThanPrevious)

separateLogs(4)
const elementEqualIndex = arrOfNumber.find((el,index) => el === index)
console.log(elementEqualIndex)

separateLogs(5)
const sortedArr = arrOfNumber.toSorted((a, b) => a - b)
console.log(sortedArr)

separateLogs(6)
const sumAllElements = arrOfNumber.reduce((accumulator, number) => {
    return accumulator + number
}, 0)
console.log(sumAllElements)

separateLogs(7)
const ifElementOver90 = arrOfNumber.some(el => el > 90)
console.log(ifElementOver90)

separateLogs(8)
const allElementsDoubleDigits = arrOfNumber.every(element => (element >= 10) && String(element).length == 2 )
console.log(allElementsDoubleDigits)

function separateLogs(num){
    console.log(`\n----------- HomeWork ${num} ---------------\n`)
};