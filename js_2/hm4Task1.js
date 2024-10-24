"use strict";

const salary = 1000
const maxValue = 1000

console.log(checkGrades(salary, maxValue))

function checkGrades(salary, maxValue){
    let grade = salary >= maxValue ? 'middle' : 'junior';
    return grade
}

// function checkGrades(){
//     let grade
//     if (salary >= maxValue){
//         return grade = 'middle'
//     }
//     else if (salary < maxValue) {
//         return grade = 'junior'
//     }
// }

