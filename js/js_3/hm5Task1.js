"use strict";

// 1 задание версия 1
findEvenNumbers(10)
function findEvenNumbers(startNumber){
    for (let index = startNumber; index >= 0 ; index--) {
        if(index % 2 === 0){
            console.log(index)
        }
    }
}
separateLogs()

// 1 задание версия 2
findEvenNumbers2(10)
function findEvenNumbers2(startNumber){
    for (let index = startNumber; index >= 0 ; index -= 2) {
        console.log(`${index} - четное число`)
    }
}
separateLogs()

// 2 задание версия 1
printSmiles()
function printSmiles(){
    const smile = ':)'
    for (let i = 1; i <= 5; i++) {
        console.log(smile.repeat(i));
    }
}
separateLogs()

// 2 задание версия 2
printSmiles2()
function printSmiles2(){
    const smile = ':)'
    let doubleSmile = ''
    for (let i = 0; i < 5; i++) {
        doubleSmile += smile;
        console.log(doubleSmile);
    }
}
separateLogs()

// 3 задание
let text = 'Hello! I am a JS student!'
removeAllSpaces(text)
function removeAllSpaces(text){
    console.log(text.replaceAll(' ', 1))
}



function separateLogs(){
    console.log(`----------- Next hm ---------------`)
};



