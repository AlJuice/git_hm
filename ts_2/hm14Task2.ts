"use strict";
  
// Создайте интерфейс IPerson, абстрактный класс Employee, который реализует интерфейс IPerson, и конкретные классы Manager и Developer.

interface IPerson {
    name: string,
    surname: string,
    experienceYears: number,
    getDetails(): string
}

abstract class Employee implements IPerson{
    protected salary: number = 0
    constructor(public name: string, public surname: string, public experienceYears: number){
        this.calculateSalary()
    }
    abstract getDetails(): string
    protected abstract calculateSalary(): number
}

type PreferedType = 'scrum' | 'kanban'

class Manager extends Employee {
    constructor(public name: string, public surname: string, public experienceYears: number, protected prefered: PreferedType){
        super(name, surname, experienceYears)
        this.prefered = prefered
    }
    protected calculateSalary(): number {
       return this.experienceYears * 500
    }
    public getDetails(): string {
        return `My name is ${this.name} ${this.surname}, I am manager with ${this.experienceYears} years of experience in ${this.prefered} and ${this.calculateSalary()}$ salary`
    }
}

type ProgrammingLanguage = 'js' | 'ts' | 'java' | 'python'

class Developer extends Employee {
    constructor(public name: string, public surname: string, public experienceYears: number, protected programmingLanguage: ProgrammingLanguage){
        super(name, surname, experienceYears)
        this.programmingLanguage = programmingLanguage
    }

    protected calculateSalary(): number {
        return this.experienceYears * 1000
     }
     public getDetails(): string {
         return `My name is ${this.name} ${this.surname}, I am software developer with ${this.experienceYears} years of experience in ${this.programmingLanguage} and ${this.calculateSalary()}$ salary`
     }

}

const pm = new Manager('John', 'Doe', 10, 'scrum')
console.log(pm.getDetails())
const backender = new Developer('Alice', 'Smith', 7, 'js')
console.log(backender.getDetails())
