"use strict";

// Теперь вместо того, чтобы указывать профессию в объекте класса Employee, создайте подклассы для разных
// типов сотрудников - Developer, Manager, и Designer, - которые будут наследовать класс Employee
// В каждом из подклассов добавьте специфические поля и методы, уникальные для этих профессий
// также реализуйте методы в классе Company, позволяющие работать с разными типами сотрудников

// 1. Создайте базовый класс Employee:
// Поля: firstName, lastName, приватное поле salary
// Геттеры и сеттеры для всех полей с валидацией, аналогично task 1 и 2
// Метод getFullName(), возвращающий полное имя сотрудника

// 2. Создайте подклассы Developer, Manager, и Designer: каждый из этих подклассом будет наследовать от класса Employee и
// добавлять свои специфические поля
// Подкласс Developer:
// Поле: programmingLanguages - массив языков программирования, которыми владеет разработчик
//  Метод addProgrammingLanguage (language: string), который добавляет новый яп в массив
// Подкласс Manager:
// Поле: teamSixe - количество людей в команде менеджера
// Метод increaseTeamSixe() - увеличивает кол-во людей в команде
// Подкласс Designer:
// Поле: designTools - массив инструментов для дизайна, которыми владеет дизайнер
// Метод addDesignTool (tool:string) - добавляет новый интсрумент в арсенал дизайнера

// 3. Добавьте метод getEmployeesByProfession(profession:string), возвращающий массив всех сотрудников переданной професии
//  getEmployeesByProfession('Developer'), возвращающий массив всех разработчиков
//  getEmployeesByProfession('Manager'), возвращающий массив всех менеджеров
//  getEmployeesByProfession('Designer'), возвращающий массив всех дизайнеров
// 4. Добавьте валидацию в метод addEmployee класса Company, которая будет проверять имя+фамилию нового сотрудника на уникальность
// Добавлять сотрудника с таким же именем+фамилией как у уже имеющегося - нельзя
// 5. Протестируйте функционал:
// Создайте несколько объектов Developer, Manager? Designer
// Добавьте их в компанию с помощью метода addEmployee()
// Протестируйте добавление сотрудников с не уникальным именем и фамилией
// Протестируйте метод getEmployeesByProfession с существующими и несуществующими профессиями

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

    
// 4. Добавьте валидацию в метод addEmployee класса Company, которая будет проверять имя+фамилию нового сотрудника на уникальность
// Добавлять сотрудника с таким же именем+фамилией как у уже имеющегося - нельзя

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