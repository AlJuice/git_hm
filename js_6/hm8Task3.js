"use strict";

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
    return arr.toSorted((a, b) => a - b)
}