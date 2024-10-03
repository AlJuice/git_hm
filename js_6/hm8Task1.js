"use strict";

// Массив чисел [7, 8, 2, 30, 85, 95, 77, 94, 37, 31], используя методы массивов сделайте следующее:
// 1. forEach - выведите в консоль все числа, делящиеся без остатка на 3 // 30 
// 2. map - создайте новый массив, в котором из каждого элемента изначального массива вычли длину изначального массива // [-3, -2 , -8, 20, 75, 85, 67, 84, 27, 21]
// 3. filter - создайте новый массив, в который войдут лишь значения, которые больше предыдущего // [8, 30, 85, 95, 94]
// 4. find - найдите элементы, равный своему индексу // 2
// 5. sort - отсортируйте массив по возрастанию, не изменив изнчальный // [2, 7, 8, 30, 31, 37, 77, 85, 94, 95]
// 6. reduce - получите сумму всех чисел массива // 466
// 7. some - проверьте, есть ли в массиве элементы больше 90 // true
// 8. every - проверьте, что все элементы массива двухзначные // false
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