"use strict";


// 1. Реализуйте метод findEmployeeByName(firstName: string) в классе Company, который возвращает объект сотрудника, если он найден
// 2. Реализуйте метод removeEmployee(firstName) в классе Company, который удаляет сотрудника по имени
// Метод должен исать сотрудника по имени и, если сотрудник найден, удалять его из массива
// Для корректной работы создайте доп приватный метод getEmployeeIndex(firstName), и используйте его в removeEmployee
// 3. Добавьте метод getTotalSalary() в классе Company, коотрый возвращает сумму всех зарплат сотрудников
// 4. Добвление валидации для полей сотрудника в сеттеры:
// Employee: 
// firstName и lasName - строка от 2 до 50 символов, только латинские буквы
// profession - строка, не может быть пустой, только латинские буквы и пробелы 
// salary - число, должно быть больше 0 и меньше 100000
// 5. Проверьте свой код:
// const emp1 = new Employee('John', 'Doe', "Developer", 3000)
// const emp2 =  new Employee('Jane', 'Smith', "Manager", 5000)
// const emp3 =  new Employee('Mark', 'Brown', "Designer", 4000)

// const company = new Company('Tech Corp', '123-456', 'Main Street')
// company.addEmployee(emp1)
// company.addEmployee(emp2)
// company.addEmployee(emp3)

// console.log(company.getTotalSalary()) // 12000
// console.log(company.findEmployeeByName("Jane")) // Employee { firstName: 'Jane, ...}
// company.removeEmployee('John')
// console.log(company.getEmployees()) // [Employee, Employee]

class Employee {
    #salary
    constructor(firstName, lastName, profession, salary) {
        this.firstName = firstName; // вызывается сеттер
        this.lastName = lastName; 
        this.profession = profession; 
        this.#salary = salary; 
    }

    get firstName(){
        return this._firstName
    }

    set firstName(firstName){
        const latinLetters = 'abcdefghijklmnopqrstuvwxyz'
        if (typeof firstName !== 'string' || firstName.length < 2 || firstName.length > 50 
                                         || !firstName.toLowerCase().split('').every(el => latinLetters.includes(el))){
            throw new Error('Invalid firstName value')
        }
        this._firstName = firstName
    }

    get lastName(){
        return this._lastName
    }

    set lastName(lastName){
        const latinLetters = 'abcdefghijklmnopqrstuvwxyz'
        if (typeof lastName !== 'string' || lastName.length < 2 || lastName.length > 50
                                        || !lastName.toLowerCase().split('').every(el => latinLetters.includes(el))){
            throw new Error('Invalid lastName value')
        }
        this._lastName = lastName
    }

    get profession(){
        return this._profession
    }

    set profession(profession){
        const latinLetters = 'abcdefghijklmnopqrstuvwxyz '

        if (typeof profession !== 'string' || profession.length === 0
                                          || !profession.toLowerCase().split('').every(el => latinLetters.includes(el))){
            throw new Error('Invalid profession value')
        }
        this._profession = profession
    }

    get salary(){
        return this.#salary
    }

    set salary(salary){
        if (typeof salary !== 'number' || salary <= 0 || salary > 100000){
            throw new Error('Invalid salary value')
        }
        this.#salary = salary
    }

    get fullName(){
        return `Name: ${this.firstName}, Surname: ${this.lastName}`
    } 
}

class Company {
    #employees = []
    constructor(title, phone, address, employees = []){
        this.title = title
        this.phone = phone
        this.address = address
        this.addEmployee(employees) 
    }

    get title(){
        return this._title
    }

    set title(title){
        if (typeof title !== 'string'){
            throw new Error('Invalid title value')
        }
        this._title = title
    }

    get phone(){
        return this._phone
    }

    set phone(phone){
        if (typeof phone !== 'number'){
            throw new Error('Invalid phone value')
        }
        this._phone = phone
    }

    get address(){
        return this._address
    }

    set address(address){
        if (typeof address !== 'string'){
            throw new Error('Invalid address value')
        }
        this._address = address
    }

    addEmployee(employee = []){
        if (employee instanceof Employee){
            this.#employees.push(employee)
        }
        else {
            return `object ${employee} is not the instance of class Employee`
        }
    }

    getEmployees(){
        return this.#employees
    }

    getInfo(){
        return `Компания: ${this.title} \nАдрес: ${this.address} \nКоличество сотрудников: ${this.#employees.length}`
    }

    findEmployeeByName(firstName){
        return this.#employees.find(el => el._firstName === firstName)

    }

    removeEmployee(firstName){
        const employeeIndex = this.#getEmployeeIndex(firstName)
        if (employeeIndex === -1){
            return `this employee ${firstName} hasn't found in our company!`
        }
        this.#employees.splice(employeeIndex, 1)

    }

    #getEmployeeIndex(firstName){
        return this.#employees.findIndex(el => el._firstName === firstName)
    }

    getTotalSalary(){        
        return company.getEmployees().reduce((acc, el) => acc += el.salary, 0)
    }
}

const emp1 = new Employee('John', 'Doe', "Developer", 3000)
const emp2 =  new Employee('Jane', 'Smith', "Manager", 5000)
const emp3 =  new Employee('Mark', 'Brown', "Designer", 4000)

// const company = new Company('Tech Corp', '123-456', 'Main Street') // вызывается ошибка, тк тип phone должен быть number!
const company = new Company('Tech Corp', 123456, 'Main Street')

company.addEmployee(emp1)
company.addEmployee(emp2)
company.addEmployee(emp3)

console.log(company.getTotalSalary()) // 12000
console.log(company.findEmployeeByName("Jane")) // Employee { firstName: 'Jane, ...}
company.removeEmployee('John')
console.log(company.getEmployees()) // [Employee, Employee]
