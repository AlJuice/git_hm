"use strict";

// 1. Напишите функцию addCharacter(character), позволяющую добавить новый объект в массив characters
// 2. Напишите функцию getCharacter(name), позволяющую получить объект персонажа по его имени
// getCharacter(fred) => {'name':'Fred', 'age': 40}
// 3. Напишите функцию getCharactersByAge(minAge), возвращающую массив персонажей НЕ МЛАДЩЕ minAge
// getCharactersByAge(40) => [{name':'Fred', 'age': 40}, {'name': 'Jack', 'age': 50}]
// 4. Напишите функцию updateCharacter(name, newCharacter) - методом getCharacter(name) получаем ссылку на нужного
// персонажа, а потом меняем ему данные
// 5. Напишите функцию для удаления персонажа removeCharacter(name)
// Реализовать через splice, индекс персонажа искать методом findIndex

const characters = [
    { 'name': 'Barney', 'age': 36 },
    { 'name': 'Fred', 'age': 40 },
    { 'name': 'Jack', 'age': 50 }
]

separateLogs(1.1)
function addCharacter(arr = [], character = {}){
    arr.push(character)
}
addCharacter(characters, { 'name': 'Alina', 'age': 28 })
console.log(characters)


separateLogs(1.2)
const newChar = { 
    'name': 'Serg', 
    'age': 27 
}
function addCharacter2(arr = [], {name, age}){
    return arr.push({name, age})
}
addCharacter2(characters, newChar)
console.log(characters)



separateLogs(2.1)
function getCharacter(arr = [], name){
    return arr.find(el => el['name'] == name)
 }
 console.log(getCharacter(characters, 'Fred'))


 
separateLogs(2.2)
function getCharacter2(arr = [], name){
   return arr.reduce((res, el) => {
        if (Object.keys(el).find(key => el[key] === name)){
            res.push(el)
        }
        return res
   }, [])
}
console.log(getCharacter2(characters, 'Alina'))


separateLogs(3.1)
function getCharactersByAge(arr = [], minAge){
    return arr.reduce((res, el) => {
     if (Object.keys(el).find(key => el[key] >= minAge)){
            res.push(el)
        }
        return res
    }, [])
}
console.log(getCharactersByAge(characters, 40))


separateLogs(3.2)
function getCharactersByAge2(arr = [], minAge){
    return arr.filter(el => Object.keys(el).find(key => el[key] >= minAge))
}
console.log(getCharactersByAge2(characters, 40))


separateLogs(4)
const newCharacter = { 
    'name': 'Jackie', 
    'age': 7 
}
function updateCharacter(arr = [], name = String, newChar){
    let character = getCharacter(arr, name)
    if(character){
        Object.keys(newChar).forEach(key => {
            character[key] = newChar[key]
        })
    }
    else {
        console.log(`Name ${name} hasn't found.`);
    }
}
console.log('Before update:', characters);
updateCharacter(characters, 'Jack', newCharacter)
console.log('After update:', characters);


separateLogs(5)
function removeCharacter(arr = [], name){
    const characterIndex = arr.findIndex(el => el.name == name)
    if (characterIndex !== -1) {
        arr.splice(characterIndex, 1)
    }
    else {
        console.log(`Name ${name} hasn't found.`);
    }
}
removeCharacter(characters, 'Fred')
console.log(characters)

function separateLogs(num){
    console.log(`\n----------- HomeWork ${num} ---------------\n`)
};