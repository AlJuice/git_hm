"use strict";

// 1. Context

separateLogs(1.1)
const qa = {
    name: 'Alina',
    age: 28,
    salary: 1000,
    getInfo(greetingsWorld){
        return `${greetingsWorld}, my name is ${this.name}, I'm ${this.age} and my salary is ${this.salary}`
    },
}
console.log(qa.getInfo("Hi"))


separateLogs(1.2)
function greetings(greetingsWorld){
    return `${greetingsWorld}, my name is ${this.name}, I'm ${this.age} and my salary is ${this.salary}`
}

const qa2 = {
    name: 'Polina',
    age: 26,
    salary: 900,
    getInfo: greetings
}
console.log(qa2.getInfo("Hello"))


// 2. Changing the context

separateLogs(2)
const anotherQA = {
    name: 'Aleks',
    age: 30,
    salary: 500,
}

console.log(qa.getInfo.bind(anotherQA)("Hi there - bind"))
console.log(qa.getInfo.call(anotherQA, "Hi there - call"))
console.log(qa.getInfo.apply(anotherQA, ["Hi there - apply"]))

// 3. Closures

separateLogs(3)

function createCounter(){
    let count = 0
    return () => {
        count ++
        return `Function was called ${count} times`
    }
}
const functionCallCounter = createCounter()

callAnyTimesCallCounter(5)

function callAnyTimesCallCounter(times){
    for (let index = 0; index < times; index++) {
       console.log(functionCallCounter())
    }
}

function separateLogs(num){
    console.log(`\n----------- HomeWork ${num} ---------------\n`)
};