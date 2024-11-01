"use strict";

function delayTwoSeconds(){
    setTimeout(() => {}, 2000)
}

const promiseResolve1 = Promise.resolve(1).then((result) => console.log(result))
const promiseRejected = Promise.reject("Promise failed").catch((result) => console.log(result))

function PromiseNumber(number){
    return new Promise((resolve, reject) => {
        resolve(number)
    })
}
console.log(PromiseNumber(5))

try {
    Promise.all([PromiseNumber(1), PromiseNumber(2), PromiseNumber(3)])
        .then((results) => console.log(results))
} catch (error) {
    console.error(error.message)
}

try {
    Promise.allSettled([PromiseNumber(1), PromiseNumber(2), PromiseNumber(3)])
        .then((results) => console.log(results))
} catch (error) {
    console.error(error.message)
}