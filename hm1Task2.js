/* Напишите программу, которая принимает целое положительное число n (от 1 до 9), 
и выводит сумму равную: n + nn + nnn, где n не перемножаются, а конкатенируются (объединение строк) */
"use strict";

function concateNumbers(){
    let n = 1
    n = String(n)
    let sum = n + (n + n) + (n + n + n)
    console.log(sum)
};

concateNumbers()