"use strict";

// Напишите дженерик-функцию getKeyByValue, которая принимает объект и значение, и возвращает ключ, соответствующий этому значению. 
// Если значение не найдено, функция должна возвращать undefined.
// Используйте keyof для типизации ключей объекта

function getKeyByValue <T extends object>(obj: T, value: T[keyof T]): keyof T | undefined {
    return Object.keys(obj).find(key => obj[key as keyof T] === value) as keyof T | undefined;
    // for (const key in obj){
    //     if (obj[key] === value) return key
    // }
    // return undefined
}

const qa = {
    name: 'Alex',
    salary: 1000,
    isManager: false
}

console.log(getKeyByValue(qa, 'Alex'))