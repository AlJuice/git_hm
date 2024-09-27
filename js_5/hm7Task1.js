"use strict";

// 1. Бесконечные аргументы
// - Напишите функцию, принимающую на вход любое кол-во массивов
// - Функция возвращает массив, в котором будут находиться все переданные в функцию в виде чисел
// - Например: mergeArrays([1,2], [3, 4], [5, 6])   // [1, 2, 3, 4, 5, 6]
// - Решить с использованием spread оператор

const arrayOfNumbers1 = [1, 2]
const arrayOfNumbers2 = [3, 4]
const arrayOfNumbers3 = [5, 6]

console.log(mergeArrays(arrayOfNumbers1, arrayOfNumbers2, arrayOfNumbers3))

function mergeArrays(...array){
    let newMergedArr = []
    for (let index = 0; index < array.length; index++) {
        newMergedArr.push(...array[index]) 
    }
    return newMergedArr
}

separateLogs()

// 2. Devide by _
// - Написать функцию, которая преобразует любое предложение в вот_Такой_Вот_Вид и возвращает его.
// - Первое слово должно начинаться с буквы в нижнем регистре, у остальных - в верхнем
// - Пример: I am super engineer => i_Am_Super_Engineer

let mySentence = 'I am super engineer'

console.log(devideSentenceBy_(mySentence))

function devideSentenceBy_(words){
    words = words.split(' ')
    for (let i = 0; i < words.length; i++) {
        if (!i){
            words[i] = words[i].toLowerCase()
        }
        else {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase()
        }
    }
    return words.join('_')
}

separateLogs()

// 3. Фибаначчи
// - Напишите функцию fibanacci(n), возвращающую энное число Фибоначчи
// - числа Фибоначчи (строка Фибоначчи) - числовая последовательность, первые два числа которой являются 0 и 1, а
// каждое последующее за ними число является суммой двух предыдущих
// Например fibanacci(8) // 21 => 01123581321 - 21 8-е число

let number = 8
console.log(fibanacci(number))

function fibanacci(num){
    const arrayNumbers = [0, 1]
    for (let i = 0; i < num; i++) {
        let currentNumber = arrayNumbers[i]
        let nextNumber = arrayNumbers[i+1]

        if (currentNumber + nextNumber == currentNumber + nextNumber){
            arrayNumbers.push(currentNumber + nextNumber)
        }
    }
    return  arrayNumbers[num]
}

function separateLogs(){
    console.log(`\n----------- Next hm ---------------\n`)
};