"use strict";

// Напишите функцию, которая принимает на вход массив слов и возвращает отсортированный массив по следующему критерию: количество гласных
// букв. Массив должен быть отсортирован по возрастанию количества гласных букв в слове.
// const words = ['umbrella', 'apple', 'ocean', 'independent', 'education', 'elephant', 'island', 'universe', 'environment', 'queue']

const words = ['umbrella', 'apple', 'ocean', 'independent', 'education', 'elephant', 'island', 'universe', 'environment', 'queue']

console.log(sortByAmountOfVowels(words))

function sortByAmountOfVowels(arr = []){
    const sortedWordsAsc = arr.toSorted((a, b) => {
        return countVowels(a) - countVowels(b)
    })
    return sortedWordsAsc
}

function countVowels(word){
    const allVowels = ["a", "e", "i", "o", "u"]
    let count = 0
    for (let i = 0; i < word.length; i++) {
        if (allVowels.includes(word[i])){
            count += 1
        }
    }
    return count
}

