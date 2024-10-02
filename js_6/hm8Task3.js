"use strict";

// Напишите функцию findMissingNumber(arr), которая принимает массив чисел от 1 до N (исключая одно число)
// и возвращает пропущенное число. Массив не отсортирован и НЕ может содержать дубликаты
// Решите эту задачу, используя эффективные методы массива
// Пример: const arr = [5, 2, 7, 3, 8, 1, 6] //4

const arrayOfNumber = [5, 2, 7, 3, 8, 1, 6]

console.log(findMissingNumber(arrayOfNumber))

function findMissingNumber(arr){
    const sortedArr = sortedArrAsc(arr)
    const finderElement = sortedArr.filter((el, index, array) =>  {
        return !(array[index+1] - array[index] == 1) && Number.isInteger(array[index+1])
    })
    return +finderElement+1 //тк пропавшая цифра всегда будет больше на 1 предыдущей в отсортированном ряде
}

function sortedArrAsc(arr = []){
    return sortedArrAsc = arr.toSorted((a, b) => a - b)
}