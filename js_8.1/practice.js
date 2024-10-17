"use strict";

// Задача 1: Написать функцию filterByAge, которая будет принимать массив объекта, вторым аргументом передавать возраст
// функция должна выводить строго те объекты, которые строго больше передаваемого возраста 

const people = [
    {name: 'Alice', age: 25},
    {name: 'Alice', age: 35},
    {name: 'Bob', age: 20},
    {name: 'Charlie', age: 30},
]

// console.log(filterByAge(people, 21))
function filterByAge(array, age){
    return array.filter( el => el.age > age)
}

// Задача 2: Есть массив объектов. Нужно просчитать сколько раз встречается shipped в объектах

const orders = [
    { orderId: 1, status: 'shipped'},
    { orderId: 2, status: 'pending'},
    { orderId: 3, status: 'shipped'},
    { orderId: 4, status: 'delivered'},
]

const shippedCount = countOccurerences('shipped')
// console.log('Shipped Orders count:', shippedCount) // Shipped Orders count: 2

function countOccurerences(status){
    return orders.reduce((result, element) => {
        // if (element.status === status){        // ver 1
        //     result++
        // }
        // return result

        return element.status === status ? ++result : result // ver 2
    }, 0)
}

// Задача 3: Написать функцию которая будет обновлять рейтинг определенного фильма
const movies = [
    { id: 1, title: 'Inception', rating: 8.8},
    { id: 2, title: 'The matrix', rating: 8.7},    
    { id: 3, title: 'Interstellar', rating: 8.6}
]

updateRating(2, 9)
// console.log('Updated Movies:', movies)

function updateRating(id, newRating){
    const foundMovie = movies.find(el => el.id === id) // получаем ссылку на объект
    foundMovie.rating = newRating
}

// Задача 4: У вас есть массив, в котором лежат пиццы - объекты, где в ключах ингредиент, в значении - названии. Но рецепты спутались!
// Нужно вернуть массив, заменив в каждой пицце cheese: gauda. Остальное оставить без изменений

const pizzas = [
    {
        greens: 'rukkola',
        vegetables: 'tomato',
        dough: 'thin',
        meat: "hamon",
        cheese: 'parmesan'
    },
    {
        greens: 'onion',
        vegetables: 'mushrooms',
        dough: 'thin',
        meat: "bacon",
        cheese: 'parmesan'
    },
    {
        greens: 'onion',
        vegetables: 'tomato',
        dough: 'thick',
        meat: "peperoni",
        cheese: 'parmesan'
    }
]

changeCheese('gauda')
// console.log(pizzas)

function changeCheese(cheese){
    pizzas.forEach(el => {
        el.cheese = cheese  // el = элемент хранит в себе ссылку на объект массива
    })
}

// Задача 5: массив компаний с внутренними вложенными департаментами-объектами со своими ключами-значениями.
// Написать методы, чтобы работать с этим глобальным массивом объектов

const enterprises = [
    {
      id: 1,
      name: "Предприятие 1",
      departments: [
        {
          id: 2,
          name: "Отдел тестирования",
          employees_count: 10,
        },
        {
          id: 3,
          name: "Отдел маркетинга",
          employees_count: 20,
        },
        {
          id: 4,
          name: "Администрация",
          employees_count: 15,
        },
      ],
    },
    {
      id: 5,
      name: "Предприятие 2",
      departments: [
        {
          id: 6,
          name: "Отдел разработки",
          employees_count: 50,
        },
        {
          id: 7,
          name: "Отдел маркетинга",
          employees_count: 20,
        },
        {
          id: 8,
          name: "Отдел охраны труда",
          employees_count: 5,
        },
      ],
    },
    {
      id: 9,
      name: "Предприятие 3",
      departments: [
        {
          id: 10,
          name: "Отдел аналитики",
          employees_count: 0,
        },
      ],
    },
  ];

// 1. Написать функцию, которая будет возвращать общее кол-во сотрудников
getTotalEmployeesCount()

function getTotalEmployeesCount(){
    return enterprises.reduce((total, enterprise) => {
        return total += enterprise.departments.reduce((res, department) => res += department.employees_count, 0)
    }, 0)
}

// 2. написать функцию, которая будет принимать 1 аргумент - айди отдела или название отдела 
// и возвращать предприятие, к которому относится

// console.log(getEnterprise(4))
// console.log(getEnterprise('Отдел аналитики'))

function getEnterprise(idOrNameDeparture){
    const foundEnterprise = enterprises.find(enterprise => {
        return enterprise.departments.find(department => {
            return department.id === idOrNameDeparture || department.name === idOrNameDeparture

            // if (department.id === idOrNameDeparture || department.name === idOrNameDeparture){
            //     return true
            // }
            // else {
            //     return false
            // }
        })
    })
    return foundEnterprise
}

// 3. Написать функцию, которая будет добавлять предприятие.
// В качестве аргумента принимает название предприятия.
// каждый айдишник на каждом уровне вложенности должен быть уникальным

function getNewId(){
    const ids = []
    enterprises.forEach(ent => {
        ids.push(ent.id)
        ent.departments.forEach(dept => {
            ids.push(dept.id)
        })
    })
    const maxId = Math.max(...ids)
    return maxId + 1
}

// можно и так. flatMap поднимает вложенные уровни
const generateNewId = (arr = enterprises) =>
    Math.max(...arr.flatMap(ent => [...ent.departments.map(dept => dept.id), ent.id])) + 1

console.log(generateNewId())

function addNewEnterprise(name){
    enterprises.push({
        id: getNewId(), 
        name,
        departments: []
    })
}

addNewEnterprise(`Предприятие ${enterprises.length + 1}`)
// console.log(enterprises)

// 4. Нужно написать функцию, которая добавляет новый департамент
function addDepartment(entId, name, employees_count){
    const newDept = {
        id: getNewId(),
        name,
        employees_count: employees_count ?? 0
    }

    const foundEnt = enterprises.find(el => el.id === entId)
    foundEnt.departments.push(newDept)
}

addDepartment(getNewId() - 1, "Отдел whatever", 5)
console.log(JSON.stringify(enterprises))
