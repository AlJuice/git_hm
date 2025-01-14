"use strict";
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
        if (typeof firstName !== 'string'){
            throw new Error('Invalid firstName value')
        }
        this._firstName = firstName
    }

    get lastName(){
        return this._lastName
    }

    set lastName(lastName){
        if (typeof lastName !== 'string'){
            throw new Error('Invalid lastName value')
        }
        this._lastName = lastName
    }

    get profession(){
        return this._profession
    }

    set profession(profession){
        if (typeof profession !== 'string'){
            throw new Error('Invalid profession value')
        }
        this._profession = profession
    }

    get salary(){
        return this.#salary
    }

    set salary(salary){
        if (typeof salary !== 'number'){
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
        if (!(employee instanceof Employee)){
            return `object ${employee} is not the instance of class Employee`
        }
        this.#employees.push(employee)
    }

    getEmployees(){
        return this.#employees
    }

    getInfo(){
        return `Компания: ${this.title} \nАдрес: ${this.address} \nКоличество сотрудников: ${this.#employees.length}`
    }
}

// const company = new Company('Tech Corp', '123-456', 'Main Street') // вызывается ошибка, тк тип phone должен быть number!
const company = new Company('Tech Corp', 123456, 'Main Street') // 
console.log(company.phone) // 123456
const emp1 = new Employee('John', 'Doe', 'Dev', 3000)
console.log(emp1.firstName) // John
emp1.salary = 3100
console.log(emp1.salary) // 3100
const emp2 = new Employee('Barbara', 'Johnson', 'QA', 2500)
company.addEmployee(emp1)
company.addEmployee(emp2)
console.log(company.getEmployees()) // [Employee, Employee]
console.log(company.getInfo()) 
