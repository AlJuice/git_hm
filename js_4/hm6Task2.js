"use strict";

// 1. У вас есть массив названий пицц вашего конкурента. Создайте скрипт с циклом, который будет проверять ваш набор названий пицц (массив)
// и выводить в консоль только те, которых нет у конкурента (тоже массив). Если все ваши пиццы есть у конкурента - вывести в консоль
// null. Скрипт не должен зависеть от регистра, в котором указаны названия пицц у вас и конкурента
// Пиццы конкурента:
// const competitorsPizzas = ['Peperoni', 'Caprichosa', 'Diablo', '4 cheeses', 'hawai']

const competitorsPizzas = ['Peperoni', 'Caprichosa', 'Diablo', '4 cheeses', 'hawai']

// const myPizzas = ['peperoni', 'caprichosa', '4 cheeses']
const myPizzas = ['peperoni', 'caprichosa', 'diablo', '4 cheeses', 'hawai']

checkPizzasWithCompetitors(myPizzas)

function checkPizzasWithCompetitors(myPizzas){
    const newMyPizzas = []
    for (let pizza of competitorsPizzas)  {
        pizza = pizza.toLowerCase()

        if (!(myPizzas.includes(pizza))){
            newMyPizzas.push(pizza)
        } 
    }
    console.log(newMyPizzas.length === 0 ? null: newMyPizzas)
}
