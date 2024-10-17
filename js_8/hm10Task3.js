"use strict";

// Создайте функцию, принимающую число n, которая при каждом вызове будет генерировать случайное число [1 - n] включительно
//  Условие - каждый следующий вызов должен давать новое число (не встречавшееся в прошлых вызовах)
// И так пока не переберутся все n чисел. На n + 1 вызов и далее функция должна возвращать 'All numbers were received'
// Задачу решить через замыкания
// Например, n = 5, функция выведет 5 чисел 1-5, а после будет выводить сугубо 'All numbers were received'
// Рекомендации: для генерации числа в границах воспользуйтесь методом getRandomArbitrary


// чет пока что не осилила, возможно вернусь позже к этому заданию
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min
}

function generateNumbers(number){
    const hasBeenNumbers = []
    let randomNumber

    return function() {
        if (hasBeenNumbers.length >= number){
            return 'All numbers were received'
        }
        else {
            console.log('before while')
            console.log("hasBeenNumbers", hasBeenNumbers)
            do {
                console.log('do')
                randomNumber = Math.round(getRandomArbitrary(1, number)) 
                hasBeenNumbers.push(randomNumber)
                console.log("randomNumber", randomNumber)
                console.log("hasBeenNumbers", hasBeenNumbers)
            }
            while (!(hasBeenNumbers.includes(randomNumber))) {
                console.log('while')
                // randomNumber = Math.round(getRandomArbitrary(1, number)) 
                // console.log("randomNumber", randomNumber)
                // hasBeenNumbers.push(randomNumber)
                // console.log("hasBeenNumbers", hasBeenNumbers)
            }

            // hasBeenNumbers.push(randomNumber)
            console.log("hasBeenNumbers", hasBeenNumbers)
            return randomNumber
        }
    }
}

const randomGenerator = generateNumbers(5);

console.log(randomGenerator())



