"use strict";

// 1. Цикл for..of в массиве
// - Создайте массив [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// - Создайте цикл for...of, бегущий по массиву, в котором будет реализована следующая логика:
// - Если элемент четный - возведет его в квадрат
// - Если элемент нечетный - возведет его в третью степень

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

console.log(`----------- Next hm ---------------`)

// 2. Методы массивов
// Создайте массив [1, 2, 3, 4, 5]
// - Добавьте в конец масива число 6 соответствующим методом
// - Добавьте в начало массива число 0 соответствующим методом
// - Удалите элемент с индексом 2 из массива соответствующим методом
// - Удалите последний элемент из массива соответствующим методом
// В результате должны получить [0, 1, 3, 4, 5]

const arrOfNumbers = [1, 2, 3, 4, 5]
function methodsArray(){
    arrOfNumbers.push(6)
    arrOfNumbers.unshift(0)
    arrOfNumbers.splice(2,1)
    arrOfNumbers.pop()
}
methodsArray()
console.log(arrOfNumbers)

console.log(`----------- Next hm ---------------`)

// 3. Деструктуризация массивов
// - Создайте массив из 5 любых чисел 
// - Через деструктуризацию получите в новые переменные первый, второй и остальные элементы массива
// - Пример: [1, 2, 3, 4, 5] => first === 1; second === 2, rest === [3, 4, 5]

const arrNumbers = [1, 2, 3, 4, 5]
const [first, second, ...rest] = arrNumbers
console.log(first)
console.log(second)
console.log(rest)

console.log(`----------- Next hm ---------------`)

// 4. Конкатенация массивов
// - Создайте массив с числами [1, 2, 3, 4, 5]
// - Создайте еще 1 массив с числами [6, 7, 8, 9, 10]
// - Создайте переменную mergedArray, который будет хранить значения из массивов 1 и 2
// - Используйте спред оператор

const numbers = [1, 2, 3, 4, 5]
const numbers2 = [6, 7, 8, 9, 10]
const mergedArray = [...numbers, ...numbers2]
console.log(mergedArray)