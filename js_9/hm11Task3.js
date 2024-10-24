"use strict";

class Employee {
    #salary
    constructor(firstName, lastName, salary) {
        this.firstName = firstName; 
        this.lastName = lastName; 
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

    get salary(){
        return this.#salary
    }
    set salary(salary){
        if (typeof salary !== 'number'){
            throw new Error('Invalid salary value')
        }
        this.#salary = salary
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

    get fullName(){
        return `Name: ${this.firstName}, Surname: ${this.lastName}`
    } 
}

class Developer extends Employee {
    constructor(firstName, lastName, salary, programmingLanguages = []){
        super(firstName, lastName, salary)
        this.programmingLanguages = programmingLanguages
    }
    addProgrammingLanguage(language){
        this.programmingLanguages.push(language)
    }
}

class Manager extends Employee { 
    constructor(firstName, lastName, salary, teamsize){
        super(firstName, lastName, salary)
        this.teamsize = teamsize
    }
    increaseTeamSize(amountPeople){
        this.teamsize += amountPeople
    }
}

class Designer extends Employee {
    constructor(firstName, lastName, salary, designTools = [] ){
        super(firstName, lastName, salary)
        this.designTools = designTools
    }
    addDesignTool(tool){
        this.designTools.push(tool)
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
        const indexOfExistingEmployee = this.#employees.findIndex(el => el._firstName === employee.firstName && el._lastName === employee.lastName)
        if (indexOfExistingEmployee !== -1){
            throw new Error(`The employee with name and surname has been existing in company already!`)
        }
        this.#employees.push(employee)
    }

    getEmployees(){
        return this.#employees
    }

    getEmployeesByProfession(profession){
        profession = profession.toLowerCase().trim()
        if (profession !== "developer" && profession !== "designer" && profession !== "manager"){
            return `The profession ${profession} hasn't been existing in company!`
        }
        const employees = this.getEmployees()
        switch(profession){
            case "developer":
                return employees.filter(el => el instanceof Developer)
            case "designer":
                return employees.filter(el => el instanceof Designer)
            case "manager":
                return employees.filter(el => el instanceof Manager)
        }
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
        return company.getEmployees().reduce((acc, el, index, arr) => acc += el.salary, 0)
    }
}


const emp1 = new Developer('John', 'Doe', "Developer", 3000)
const emp2 =  new Manager('Jane', 'Smith', "Manager", 5000)
const emp3 =  new Designer('Mark', 'Brown', "Designer", 4000)
const emp4 =  new Designer('Madina', 'Ab', "Designer", 4800)
const emp5 = new Developer('John', 'Duyng', "Developer", 9000)
// const emp6 = new Developer('Jane', 'Smith', "Designer", 4000) // кидает ошибку, тк нельзя создавать сотрудника с одинаковыми именами и фамилиями

const company = new Company('Tech Corp', 123456, 'Main Street')

company.addEmployee(emp1)
company.addEmployee(emp2)
company.addEmployee(emp3)
company.addEmployee(emp4)
company.addEmployee(emp5)
// company.addEmployee(emp6)

console.log(company.getEmployeesByProfession('Developer')) 
console.log(company.getEmployeesByProfession('Manager'))
console.log(company.getEmployeesByProfession('Designer')) 
console.log(company.getEmployeesByProfession('QA')) 