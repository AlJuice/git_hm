"use strict";

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min
}

separateLogs(3.1)

function generateNumbers(number){
    const allNumbers = new Set()
    let hasSeenNumbers = 0

    return function() {
        if (hasSeenNumbers >= number){
            return 'All numbers were received'
        }

        else {
            let randomNumber = Math.round(getRandomArbitrary(1, number))
            if (!allNumbers.has(randomNumber) && allNumbers.size <= number){
                allNumbers.add(randomNumber)
                hasSeenNumbers++
                return randomNumber
            }
            else {
                while (allNumbers.has(randomNumber) && allNumbers.size <= number){
                    randomNumber = Math.round(getRandomArbitrary(1, number))
                }
                allNumbers.add(randomNumber)
                hasSeenNumbers++
                return randomNumber
            }
        }
    }
}

const randomGenerator = generateNumbers(5);

console.log(randomGenerator())
console.log(randomGenerator())
console.log(randomGenerator())
console.log(randomGenerator())
console.log(randomGenerator())
console.log(randomGenerator())


separateLogs(3.2)

const createRandom = (n) => {
    let countMin = 0;
    let countMax = 0;
    return () => {
        if (countMax == n) {
            return 'All numbers were received';
        } else {
            countMin++;
            countMax++;
            return Math.floor(getRandomArbitrary(countMin, countMax));
        }
  };
}
const  getNewRandom = createRandom(5);
console.log(getNewRandom());
console.log(getNewRandom());
console.log(getNewRandom());
console.log(getNewRandom());
console.log(getNewRandom());
console.log(getNewRandom());

function separateLogs(num){
    console.log(`\n----------- HomeWork ${num} ---------------\n`)
};
