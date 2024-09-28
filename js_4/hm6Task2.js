"use strict";

// 1. У вас есть массив названий пицц вашего конкурента. Создайте скрипт с циклом, который будет проверять ваш набор названий пицц (массив)
// и выводить в консоль только те, которых нет у конкурента (тоже массив). Если все ваши пиццы есть у конкурента - вывести в консоль
// null. Скрипт не должен зависеть от регистра, в котором указаны названия пицц у вас и конкурента
// Пиццы конкурента:
// const competitorsPizzas = ['Peperoni', 'Caprichosa', 'Diablo', '4 cheeses', 'hawai']

const competitorsPizzas = ['Peperoni', 'Caprichosa', 'Diablo', '4 cheeses', 'hawai']
// const myPizzas = ['peperoni', 'caprichosa', '4 cheeses']
const myPizzas = ['PeperonI', 'Caprichosa', 'diablo', '4 cheeses', 'hawai' ]

comparePizzasWithCompetitors(myPizzas, competitorsPizzas)

function comparePizzasWithCompetitors(arr, arr2){
    const newMyPizzas = []
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toLowerCase();
    }
    for (let pizza of arr2)  {
        if (!(arr.includes(pizza.toLowerCase()))){
            newMyPizzas.push(pizza)
        }  
    }
    console.log(newMyPizzas.length === 0 ? null: newMyPizzas)
}
