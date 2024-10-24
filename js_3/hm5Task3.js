"use strict";

function countWord(word){
    let countVowels = 0, 
        countConsonants = 0
    const allVowels = ["a", "e", "i", "o", "u"],
        allConsonant = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']

    word = word.toLowerCase().trim()

    for (let i = 0; i < word.length; i++) {
        let element = word[i];
        // console.log(element)
        if (allVowels.includes(element)){
            countVowels += 1
        }
        else if (allConsonant.includes(element)){
            countConsonants += 1
        }
    }
    console.log(`${word} contains ${countVowels} vowels and ${countConsonants} consonants`)
}

countWord('Alina')
countWord('Engineer')





