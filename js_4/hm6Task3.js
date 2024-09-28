"use strict";

// Удалить дубликаты
// - Создайте массив из чисел [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 4, 6, 8, 10, 1, 3, 5, 7, 9]
// - Напишите скрипт, который убирает из массива дубликаты
// - При удалении дубликата, длина массива должна уменьшаться

const arrayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 4, 6, 8, 10, 1, 3, 5, 7, 9]
const uniqueArray = [];

console.log(unique(arrayNumbers))

function unique(arrayNumbers) {
    for (let number of arrayNumbers) {
      if (!uniqueArray.includes(number)) {
        uniqueArray.push(number);
      }
    }
    return uniqueArray
}
  

// vers 2 через Set
const newArray = [...new Set(arrayNumbers)];     
console.log(newArray)
