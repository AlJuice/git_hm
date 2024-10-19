"use strict";

// 1. Context
// - Создайте объект qa с полями name, age, salary и методом getInfo(greetingsWorld), который будет возвращать строку вида:
// `${greetingsWord}, my name is ${name}, I'm ${age} and my salary is ${salary}`
// Значения в строке должны ссылаться на контекст этого объекта, без подмен
// 2. Changing the context
// - Создайте объект anotherQA с полями name, age, salary, значения в которых будут отличны от объекта qa
// - Вызовите метод getInfo объекта qa с контекстом вызова объекта anotherQA с помощью метода bind()
// - Вызовите метод getInfo объекта qa с контекстом вызова объекта anotherQA с помощью метода call()
// - Вызовите метод getInfo объекта qa с контекстом вызова объекта anotherQA с помощью метода apply()
// 3. Closures
// - Создайте функцию createCounter(),
// - Создайте в функции createCounter переменную count, которая будет равна 0
// - Верните из функции createCounter новую функцию
// - В теле новой функции реализуйте увеличение count на +1 при каждом вызове функции
// - После увеличения каунтера выводите в консоль `Function was called ${count} times`
// - Создайте переменную functionCallCounter, в которой будет лежать результат createCounter()
// - Вызовите functionCallCounter() 5 раз, убедитесь что в консоли верно выводятся данные

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


separateLogs(2)
const anotherQA = {
    name: 'Aleks',
    age: 30,
    salary: 500,
}

console.log(qa.getInfo.bind(anotherQA)("Hi there - bind"))
console.log(qa.getInfo.call(anotherQA, "Hi there - call"))
console.log(qa.getInfo.apply(anotherQA, ["Hi there - apply"]))


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