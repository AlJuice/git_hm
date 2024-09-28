"use strict";

// Напишите рекурсивную функцию, которая принимает на вход число и складывает его цифры
// Если сумма получилась больше 9 - снова сложите цифры. И так пока, сумма не станет меньше либо равной 9
// После окончания сложений возвращает полученное число. 
// Например при подаче числа 19 (1 + 9 = 10 > 9, потому 1 + 0 = 1) и выводится 1

let summ = 0
console.log(recursiveSummOfNumber(19))

function recursiveSummOfNumber(number){
    if (summ <= 9 && summ != 0){
        return number
    }
    else { 
        // если число трехзначное
        if (String(number).length > 2){
            // если число четырехзначное
            if (String(number).length > 3){
                return 'Слишком большое число. Я устала, дайте отдохнуть.'
            }
            else {
                summ = Number(String(number).slice(0,1)) + 
                   Number(String(number).slice(0+1,1+1) + 
                   Number(String(number).slice(0+2,1+2)))
                return recursiveSummOfNumber(summ)
            }
        }
        // если простое число и двухзначные числа
        else {
            summ = Number(String(number).slice(0,1)) + Number(String(number).slice(0+1,1+1))
            return recursiveSummOfNumber(summ)
        }
    }
}
