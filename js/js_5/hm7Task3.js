"use strict";

console.log(recursiveSummOfNumber(19))
function recursiveSummOfNumber(number){
    let summ = 0
    if (number <= 9){
        return number
    }
    else {
        const arr = String(number).split('')
        for (const el of arr){
            summ += +el
        }
        return recursiveSummOfNumber(summ)
    }
}

// Переменную с суммой также держать вне функции неверно, ибо ты отделяешь часть деталей реализации от самой функции
// let summ = 0 
// console.log(recursiveSummOfNumber(19))

// function recursiveSummOfNumber(number){
//     if (summ <= 9 && summ != 0){
//         return number
//     }
//     else { 
//         // если число трехзначное
//         if (String(number).length > 2){
//             // если число четырехзначное
//             if (String(number).length > 3){
//                 return 'Слишком большое число. Я устала, дайте отдохнуть.'
//             }
//             else {
//                 summ = Number(String(number).slice(0,1)) + 
//                    Number(String(number).slice(0+1,1+1) + 
//                    Number(String(number).slice(0+2,1+2)))
//                 return recursiveSummOfNumber(summ)
//             }
//         }
//         // если простое число и двухзначные числа
//         else {
//             summ = Number(String(number).slice(0,1)) + Number(String(number).slice(0+1,1+1))
//             return recursiveSummOfNumber(summ)
//         }
//     }
// }

