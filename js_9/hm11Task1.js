"use strict";

// // массив значений будет в консоль логе
// const obj = { a: 1, b: 2, c: 3}
// // console.log(Object.values(obj))

// // отдельные массивы, состоящие из пары ключ-значения
// // console.log(Object.entries(obj))

// // true
// // console.log("b" in obj)

// // удалит значение b => { a: 1, c: 3 }
// delete obj.b
// // console.log(obj)

// // Классы
// // Что если такие объекты user нам нужно создавать часто? (интерфейсы)
// const user1 = {
//     username: 'Alina',
//     password: 123456
//     //...
// }

// function generateUser(username, password){
//     return {username, password}
// }
// // Если метод занимает около 50 строк кода, то он становится слишком загроможденным, и неудобным для дальнейшей работы
// // А если передаваемых аргументов будет 100 в generateUser, то будет сложно
// // Поэтому приходят классы на помощь. 

// Класс - чертеж нашего объекта, который будет создаваться, или лекало для дальнейшего шитья
// Класс создаст полноценный готовый обьект, который уже будет иметь методы для работы с его данными
// Конструктор объявляются с помощью ключевого слова class
// Классы называются с большой буквы (константы состоят из капслока)

// class Alina {
//     name = 'Alina';
//     surname = 'Sapr'; 
//     password = 12345;
//     getInfo() {                                               // метод getInfo объекта User
//         return `Name: ${this.name}, surname: ${this.surname}` // (this = контекст) this будет являться экземпляром класса
//     }
// }

// // создание нового экземпляра класса через ключевое слово new и вызов класса User()
// const user = new Alina()
// console.log(user.getInfo())

// // Класс полноценного юзера с различными данными
class User {
    project = [] // дефолтное значение для работы со сложными данными
    // принимает поля и сеттит их для объекта User
    constructor(name, surname, password, projects = []){
        this.name = name  // передаем сеттеру, поэтому не указываем нижнее подчеркивание
        // если было бы нижнее подчеркивание, то сеттер пропускается и данные не валидируются
        this.surname = surname
        this.password = password
        
        for(const project of projects){
            this.projects.push(project)
        }
    }
    getInfo() {                                               
        return `Name: ${this.name}, surname: ${this.surname}` 
    }

    get name() {  // getter - поле - возвращает данные для получения извне объекта (внешний юзер получает данные)
        return this._name // с нижним подчеркивание - потому что в конструкторе, создаем уже не напрямую, а обращаемся к сеттеру, 
        // к внутреннему _name
    }

    // хорошая практика - внутри сеттера реализовать всю валидацию для данных
    set name(name) {  // setter - возможность валидации данных при их установке значений внутри объекта
        if (typeof name != 'string' ||  name.length < 3 || name.length > 40 ){ // обработчик переменной name
            throw new Error('Invalid user value') // кидаем ошибку
        }
        this._name = name // с нижним подчеркивание - скрываем поле от юзера - скрывает возможность прямого доступа к данным
    }
}

// const tatiana = new User('Tanya', 'Cat', 'qwerty') // создание экземпляра объекта
// const leonid = new User('Leon', 'Jsov', '1234')
// // console.log(tatiana.getInfo())
// console.log(leonid.getInfo()) // ссылаемся на себя и вызываем метод

// // setters and getters
// // взаимодействие с данными внутри конечного объекта
// // Поменяли поле name в объекте leonid
// leonid.name = 'Leo' // устанавливаем уже значение через сеттер
// // leonid.name = true // с сеттером  не получится изменить на другой тип данных
// console.log(leonid.getInfo()) 

// // Классы созданы для того, чтобы защитить данные от некорректных вмешательств
// // Мы начинаем скрывать наши поля под методами геттера и сеттера
// // и тем самым контролировать данные в объекте
// // Геттеры и Сеттеры. Методы - которые работают больше как поля
// // Геттер - поля в классе, который показывает как отображаются значения в объекте - возвращает из объекта данные
// // Сеттер - поле в классе, которое меняет значения в объекте
// // сеттер не работает без геттера.
// // console.log(leonid.name) 

// // как вставлять в класс сложные данные
// // project
// // нужно делать типизацию для аргументов

// const u = new User('Leon', 'Jsov', '1234', [1,2,3]) ???? ошибку кидает почему-то


// // Наследование
// // Car - базовый класс для всех автомобилей
// class Car {
//     constructor(model){
//         this.model = model
//         this.speed = 0
//     }
//     drive(speed){
//         this.speed = speed
//         console.log(`${this.model} is now ${speed}`)

//     }
//     stop(){
//         this.speed = 0
//         console.log(`${this.model} stopped`)
//     }
// }

// const car = new Car('Tesla')
// // car.drive(100)
// // car.stop()

// // и дальше создавать новые классы для моделей автомобилей, которые будут наследовать все методы базового класса
// class BWM extends Car {
//     // model = 'M5 Competition' // переопределение поля
//     constructor(model, engineVolume){ // переопределение конструктора
//         super(model) // базовый конструктор Car сам отработает и всегда ставится в начале
//         this.engineVolume = engineVolume // а мы добавим лишь это поле к остальным
//     }

//     goToServiceStation(){  // расширили базовые методы класса Car, создав новый для класса BWM
//         console.log(`${this.model} is going to service station`)  
//     }

//     drive(speed){   // переопределили метод из родителя класса car
//         super.drive(speed) // super - ссылка на класс родителя и вызывает метод drive из родительского класса
//         this.stop()
//         console.log(`${this.model} oil is 0!`)
//     }
// } // наследовано все поля класса Car с помощью ключ.слова extends и можем обращаться к ним

// const x5 = new BWM('X5', 5)
// x5.drive(50) // используем базовые методы класса Car
// // x5.stop()
// x5.goToServiceStation()
// console.log(x5)

// // можем в наследниках переопределять методы базового класса Car, но это не оч хорошая практика
// // переопределение у наследниках не влияет на родительские методы, они касаются и могут вызвваться только у дочернего класса BWM 
// // Можно переопределить и какие-то поля

// // принцип Solid - принцип постановки барбары лискоб - если у тебя в классе родителя есть какие-то методы или поля, то
// // вместо класса родителя всегда можно подставить методы наследников и они должны взаимозаменять друг друга
// // тк родители задают изначально структуру

// // как расширить родительские методы, сохранив при этом старые поля, + добавить новые поля?
// // сначала используем super, потом только уже новые поля для добавления
// // super - ссылка на класс родителя
// // this - ссылка на сам объект (this - контекст)


// // Static 
// // Класс может обладать свойстами и методами, которые не будут храниться у наследников, и будут только у родителя
// // Статические поля\методы - Данное поле\метод работает только у самого класса
// // Статические поля\методы Нужны классу тогда когда нет необходимости создания интсанс класса - объекта, созданного из класса 
// class Car {
//     static numberOfWheels = 4 // статический метод
//     constructor(model, speed){
//         this.model = model
//         this.speed = speed
//     }

//     static getCarInfo(){ return `this is a car!`}
// }

// const c = new Car('x5')
// console.log(c.numberOfWheels) // undefined
// // У объекта нельзя вызывать - только у самого класса
// console.log(Car.numberOfWheels) // 4
// console.log(Car.getCarInfo()) // 4


// class Calculator {
//     static add (a, b){
//         return a + b
//     }
//     static subtract(a, b){
//         return a - b
//     }
// }
// console.log(Calculator.add(5, 1)) 
// console.log(Calculator.subtract(10, 5)) 

// // Статические методы вызываются только у самого класса
// // Нестатические методы вызываются у объектов класса (инстанс класса)

// Инстанцирование классов — это процесс создания на основе класса экземпляра (instance) — 
// объекта, который получает доступ ко всему содержимому класса, но при этом обладает и способностью хранить собственные данные.

// private - public
// приватное - публичное
// модификаторы доступа - предоставлять пользователю только тот функционал, который ему доступен, остальное скрывать от него
// публичные поля и методы - внешние поля доступные дл обращения извне
// приватные  поля и методы - внутренняя настройка класса, нельзя к ним обращаться извне

class Car {
    #fuelLevel // приватное поле
    #fuelConsumption // приватное поле
    #maxTankVolume // приватное поле

    constructor(fuelLevel, fuelConsumption, maxTankVolume){
        this.#fuelConsumption = fuelConsumption
        this.#fuelLevel = maxTankVolume
        this.#maxTankVolume = fuelLevel || 0
    }

    get whatFuelLevel(){
        return this.#fuelConsumption
    }

    fillFuel(fuelAmount){
        if (this.#maxTankVolume - this.#fuelLevel < fuelAmount) {
            throw new Error(`Can't this.fillFuel, too ,uch fuel`)
        } else {
            this.#fuelLevel += fuelAmount
        }
    }

    drive(distance){
        if(this.#fuelLevel === 0) {
            throw new Error('Cant reach the distnace')
        } else {
            this.#fuelLevel -= (distance / 100) * 5
        }
    }

    #reduceFuelAmount(distance){ // приватный метод
        //...
    }

    getFuelAmount(){
        return this.#fuelLevel 
    // таким образом можно уже устанавливать что юзер может и как взаимодейтсвовать с приватными полями\методами
    }

}

const car = new Car(0, 5, 80)
// console.log(c.#fuelLevel) // нельзя напрямую обратиться тк оно приватное, с ним можно работать только внутри класса
// console.log(car.whatFuelLevel) // get поле
// console.log(car.getFuelAmount()) // а это функция и она вызывается

// приватные поля не наследуются
class BMW extends Car {
    getInfo(){
        // console.log(this.#fuelConsumption) // наследник не получил приватного поля и не может к нему обращаться
    }
    // console.log(this.#reduceFuelAmount) // наследник не получил приватного метода и не может к нему обращаться
}

const bmw = new BMW(8, 5, 880)

// проверка на инстанс instanceof
// удостовериться что объект создан из определенного класса
console.log(bmw instanceof BMW) // true
console.log(bmw instanceof Car) // true
console.log(bmw instanceof Error) // false
// тк объекты, созданные из классов наследников - созданы из класса родителей точно также



