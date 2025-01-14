"use strict";

// hm 8 task 2
const arrayOfWords = ['umbrella', 'apple', 'ocean', 'independent', 'education', 'elephant', 'island', 'universe', 'environment', 'queue']

function countVowels(word){
    const vowels = "aeioyu";
    return [...word].filter((char) => vowels.includes(char)).length
}

function sortByVowels(array){
    return [...array].sort((word1, word2) => countVowels(word1) - countVowels(word2))

}
// console.log(sortByVowels(arrayOfWords))
// ------------------------------------------------------------------------------------------------------------------
// Задача 1: У вас есть массив с ценами товаров в чеке. В консоль нужно вывести сумму всех цен и среднюю цену товара
// Итого: 8495 $, средняя цена товара 700 $ - пример сообщения в консоле

const prices = [64, 7556, 345, 7556, 345, 7556, 345, 7556, 433, 345, 756, 123, 942, 3112, 
                421, 9341, 1212, 8, 43, 41, 345, 341, 21, 321, 123]

function getTotalPrice(arr = []){
    return arr.reduce((sum, price) => sum + price, 0)
}

function getAveragePrice(arr = [], totalPrice){
    return getTotalPrice(arr) / arr.length
    // return totalPrice ? totalPrice : getTotalPrice(arr) / arr.length vers 2
}
// console.log(`Итого: ${getTotalPrice(prices)} $, средняя цена товара ${getAveragePrice(prices)} $`)

// 1 ver 2
function logTotalAndAvrPrice(arr){
    const total = getTotalPrice(arr)
    const avg = total / arr.length
    // console.log(`Итого: ${total} $, средняя цена товара ${avg} $`)
}

// ------------------------------------------------------------------------------------------------------------------
// Задача 2: напишите функцию, принимающую массив чисел и возвращающую число, сколько раз нужное число встречается в массиве

const arrayNumbers = [1, 2, 2, 3, 2, 4, 5]
// console.log(countOccurrences(arrayNumbers, 2))

function countOccurrences(arr = [], num){
    // return arr.filter(number => number === num).length // ver1

    // return arr.reduce((numberOfOccurs, number) => { 
    //     if(number === num){
    //         numberOfOccurs++
    //     }
    //     return numberOfOccurs
    // }, 0) // ver2

    return arr.reduce((numberOfOccurs, number) => number === num ? ++numberOfOccurs : numberOfOccurs, 0) // ver3
}

// ------------------------------------------------------------------------------------------------------------------
// Задача 3: Дан массив цифр, необходимо вернуть то число, которое первое встречается в массиве нечетное кол-во раз
// [7] должно вернуть 7, потому что число встречается 1 раз, что является нечетным 
// [1, 1, 2, 2, 2] должно вернуть 2, потому что число встречается 3 раз, что является нечетным 

// console.log(getOdd([0, 1, 0, 1, 1]))

function getOdd(array = []){
    for (const num of array){
        let numberOfOccurs = 0
        for (const element of array) { // еще раз пробегаемся по массиву и снова сравниваем с каждым элементом
            if (num === element){
                numberOfOccurs++
            }
        }
        // console.log("numberOfOccurs", numberOfOccurs)
        // console.log(numberOfOccurs % 2)
        if (numberOfOccurs % 2){ // только если будет 0 - false, другое же true
            // любое нечетное число имеет остаток 1
            return num
        }
    }
}

// 3 ver2
// console.log(getOdd([0, 2, 0, 2, 2]))

function getOdd(array = []){
    return array.find((element, index, array) => array.filter(num => element === num).length % 2)
}

// 3 ver3
// console.log(getOdd([0, 2, 0, 2, 2]))

function getOdd(array = []) {
    return array.reduce((acc, el, i, arr) => {
        if (arr.filter(number => number === el).length % 2 && acc.length === 0) {
            acc.push(el);
        }
        return acc;
    }, []);
}

// ------------------------------------------------------------------------------------------------------------------
// Задача 4:  написать алгоритм, есть массив, в котором находятся куча всего и нолики, нужно написать функцию, которая
// возьмет и каждый раз когда она находит ноль, то переносит их в конец массива.
// пример: [false, 1, 1, 2, 1, 3, "a", 0, 0]

// console.log(moveZeros([false, 1, 0, 1, 2, 0, 1, 3, "a"]))

function moveZeros(arr = []){
    const arrayWithoutZero = arr.filter(element => element !== 0)
    const arrayWithZeros = arr.filter(element => element === 0)
    return [...arrayWithoutZero, ...arrayWithZeros]
}

// 4 ver2
// console.log(moveZeros2([false, 1, 0, 1, 2, 0, 1, 3, "a"]))

function moveZeros2(arr = []){
    const arrayWithoutZeros = arr.filter(element => element !== 0)
    const numberOfZeros = arr.length - arrayWithoutZeros.length 
    for (let index = 0; index < numberOfZeros; index++) {
        arrayWithoutZeros.push(0)
    }
    return arrayWithoutZeros
}

// ------------------------------------------------------------------------------------------------------------------
// Задача 5: Напишите функцию, которая принимает на вход массив целых чисел
// и возвращает отсортированный массив по следующему критерию: кол-во цифр в числе

const arrayOfDifferentNumbers = [123, 4565565, 1, 241234124124, 12, 5656]
// console.log(sortByNumbers(arrayOfDifferentNumbers))

function getAmountOfLengthNumbers(number){
    return String(number).length
}

function sortByNumbers(array){
    return array.toSorted((a, b) => getAmountOfLengthNumbers(a) - getAmountOfLengthNumbers(b))
}

// ------------------------------------------------------------------------------------------------------------------
// Задача 6: Написать функцию, которая принимает массив чисел и возвращает новый массив,
// где в каждом числе переставлены цифры так,
// чтобы получилось максимально возможным числом, например: 1234 => 4321

const arr = [123, 542, 968, 352, 1, 308]
// console.log(getGreatestTransformedNumbers(arr))

function getGreatestTransformedNumbers(array = []){
    // return array.map(el => createMaxNumber(el)) // ver1
    return array.map(createMaxNumber) // ver 2
}

function createMaxNumber(number){
    return +[...String(number)].sort((a, b) => +b - +a).join('')
}

// ------------------------------------------------------------------------------------------------------------------
// hm 7 task 3 - recursive task

function getRecursiveSum(number){
    const sum = [...number.toString()].reduce((a,b) => +a + +b)
    return sum > 9 ? getRecursiveSum(sum) : sum
}

// console.log(getRecursiveSum(123))