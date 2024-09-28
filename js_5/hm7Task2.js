"use strict";

// 1. Написать функцию, которая принимает на вход слово и проверяет, является ли это слово палиндромом
// А также в этой задаче есть еще 2 момента:
// если мы идем циклами - нужно ли нам идти по всей длине слова, или остановиться можно на середине?) мы ведь с двухсторон проверяем)
// можно решить через метод .reverse()

const myWord = 'Топот'
checkWordPalindrom(myWord)

// сократили функцию до необходимого минимума
function checkWordPalindrom(word){
    word = word.toLowerCase().split('')
    for (let i = 0; i < word.length; i++) {
        if (word[i] !== word[(word.length - 1) - i]){
            return false
        }
    }
    return true
}


// function checkWordPalindrom(word){
//     word = word.toLowerCase().split('')
//     let count = 0
//     for (let i = 0; i < word.length; i++) {
//         let startLetter = word[i]
//         let endLetter = word[(word.length - 1) - i]

//         if (startLetter === endLetter){
//             count += 1
//         }
//     }
//     if (count == word.length){
//         logWord(true, myWord)
//     } else {
//         logWord(false, myWord)
//     }
// }
// function logWord(boolean, word){
//     if (boolean){
//         console.log(`The word: ${word} - is a palindrom` )
//     } else{
//         console.log(`The word: ${word} - is not a palindrom` )
//     }
// }

separateLogs()

// 2. Написать функцию, которая принимает предложение (слова разделенные только пробелами) в качестве параметра и
// возвращает слово с наибольшим количеством букв
// Если таких слов несколько - возвращает их все

let mySentence = 'Its just a word '
console.log(checkMaxWordInSentence(mySentence))

function checkMaxWordInSentence(sentence){
    sentence = sentence.trim().split(' ')
    const arrayForCompare = []
    const arrayForMaxWords = []
    let maxValue = 0

    for (let index = 0; index < sentence.length; index++) {
        arrayForCompare.push(sentence[index].length)
        let currentValue = arrayForCompare[index]

        if (maxValue < currentValue){
            maxValue = currentValue
        }
        else if (maxValue == currentValue){
            arrayForMaxWords.push(sentence[index])
        }
    }
    arrayForMaxWords.push(sentence[arrayForCompare.indexOf(maxValue)])
    return arrayForMaxWords
}


function separateLogs(){
    console.log(`\n----------- Next hm ---------------\n`)
};