"use strict";

// Имеется объект const character = { 'name': 'Barney', 'age': 36, 'gender': 'male', 'isQA': true}
// 1. Создать массив из ключей объекта character и вывести в консоль те, где 4 буквы // name, isQA
// 2. Создать массив из значений объекта character и вывести в консоль те, где тип данных строка // 'Barney', 'male'
// 3. Создать массив из ключей и значений объекта character, перебрать массив циклом for
// На каждой итерации вывести пары ключ-значение в виде `key = ${key}, value = ${value}`
// 4. Проверить, есть ли в объекте ключ salary, результат вывести в консоль
// Реализовать 2-мя способами: через оператор in и Object.hasOwn()

const character = { 
    'name': 'Barney', 
    'age': 36, 
    'gender': 'male',
    'isQA': true
}

separateLogs(1.1)
const getKeys = Object.keys(character).forEach(key => {
    if (key.length === 4){
        console.log(key)
    }
})

separateLogs(1.2)
const getKeysFilter = Object.keys(character).filter(key => key.length === 4)
console.log(...getKeysFilter)

separateLogs(2)
const getValuesString = Object.values(character).filter(value => typeof value === "string")
console.log(...getValuesString)

separateLogs(3)
const getKeysValues = Object.entries(character).forEach(el => console.log(`key = ${el[0]}, value = ${el[1]}`))

separateLogs(4.1)
const isKeyInObject = 'salary' in character
console.log(isKeyInObject)

separateLogs(4.2)
console.log(character.hasOwnProperty('salary'))


function separateLogs(num){
    console.log(`\n----------- HomeWork ${num} ---------------\n`)
};