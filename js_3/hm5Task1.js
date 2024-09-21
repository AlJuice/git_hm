"use strict";

// 1. Создайте цикл, который выведет в консоль только четные цифры от 10 до 0 (10-8-6-4-2-0)
// 2. Написать скрипт, который выведет 5 строк в консоль таким образом, чтобы в первой строчке выводилось :), во второй :):) и тк.
// Пример: 
// :)
// :):)
// :):):)
// :):):):)
// :):):):):)
// 3. Создайте скрипт, который удалит все пробелы из строчки:
// - Создайте переменную text со значением: Hello! I am a JS student!
// - Выведите в консоль text, заменив в ней все пробелы на 1 (единица)
// - Реализуйте с помощью метода replaceALL
// Пример: Hello!1I1am1a1JS1student!

// 1 задание
findEvenNumbers()
function findEvenNumbers(){
    for (let index = 10; index >= 0 ; index--) {
        if(index % 2 === 0){
            console.log(index)
        }
    }
}
console.log(`----------- Next hm ---------------`)


// 2 задание
printSmiles()
function printSmiles(){
    let smile = ':)'
    for (let i = 1; i <= 5; i++) {
        console.log(smile.repeat(i));
    }
}
console.log(`----------- Next hm ---------------`)

// 3 задание
let text = 'Hello! I am a JS student!'
removeAllSpaces(text)
function removeAllSpaces(text){
    console.log(text.replaceAll(' ', 1))
}






