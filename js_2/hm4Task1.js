"use strict";

// Создайте переменную salary со значением 1000
// Создайте переменную grade, которая должна получить значение "middle", если salary больше или равна 1000, 
// и значение "junior" - есои меньше

const salary = 1000
const maxValue = 1000

function checkGrades(){
    let grade
    if (salary >= maxValue){
        grade = 'middle'
    }
    else if (salary < maxValue) {
        grade = 'junior'
    }
    console.log(grade)
}

checkGrades()