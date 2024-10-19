"use strict";

// У вас есть массив чисел. Напишите функцию countOccurrences, которая принимает массив чисел и возвращает объект
// с подсчетом каждого числа.
// Ожидается: { 1: 1, 2: 2, 3: 1, 4: 3, 5: 1}

separateLogs(2.1)

const numbers = [1, 2, 2, 3, 4, 4, 4, 5]
// const numbers = [2, 1, 4, 5, 2,  3, 4, 4]

function countOccurrences(arr){
    arr = arr.toSorted((a,b) => a - b)
    let count = 1
    return arr.reduce((acc, element, index, array) => {
        if (element === array[index + 1]){
            acc[element] = count++
        }
        else {
            acc[element] = count
            count = 1
        }
        return acc
    }, {});
}
console.log(countOccurrences(numbers))

separateLogs(2.2)

function countOccurrences2(arr){
    return arr.reduce((accumulator, el) =>
        (accumulator[el]
         ? accumulator[el]++
         : accumulator[el] = 1, accumulator), {});
}
console.log(countOccurrences2(numbers))

function separateLogs(num){
    console.log(`\n----------- HomeWork ${num} ---------------\n`)
};
