"use strict";

// Создайте функцию, принимающую число n, которая при каждом вызове будет генерировать случайное число [1 - n] включительно
//  Условие - каждый следующий вызов должен давать новое число (не встречавшееся в прошлых вызовах)
// И так пока не переберутся все n чисел. На n + 1 вызов и далее функция должна возвращать 'All numbers were received'
// Задачу решить через замыкания
// Например, n = 5, функция выведет 5 чисел 1-5, а после будет выводить сугубо 'All numbers were received'
// Рекомендации: для генерации числа в границах воспользуйтесь методом getRandomArbitrary

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min
}

function generateNumbers(number){
    const allNumbers = new Set()
    let hasSeenNumbers = 0

    return function() {
        if (hasSeenNumbers >= number){
            return 'All numbers were received'
        }

        else {
            let randomNumber = Math.round(getRandomArbitrary(1, number))
            if (!allNumbers.has(randomNumber) && allNumbers.size <= number){
                allNumbers.add(randomNumber)
                hasSeenNumbers++
                return randomNumber
            }
            else {
                while (allNumbers.has(randomNumber) && allNumbers.size <= number){
                    randomNumber = Math.round(getRandomArbitrary(1, number))
                }
                allNumbers.add(randomNumber)
                hasSeenNumbers++
                return randomNumber
            }
        }
    }
}

const randomGenerator = generateNumbers(5);

console.log(randomGenerator())
console.log(randomGenerator())
console.log(randomGenerator())
console.log(randomGenerator())
console.log(randomGenerator())
console.log(randomGenerator())



