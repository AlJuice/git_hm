"use strict";

interface IEmployee {
    name: string, 
    salary: number, 
    isManager: boolean 
}

const QA: IEmployee = {
    name: 'Alex',
    salary: 1000,
    isManager: false
}

type EmployeeKeys = keyof IEmployee
type QaKeys = keyof typeof QA
type UserType = typeof QA
type OptionalEmployee = Partial<IEmployee>
type EmployeeWithoutManager = Omit<IEmployee, 'isManager'>
type ReadonlyEmployee = Readonly<IEmployee>
type RecordQA = Record<string, keyof typeof QA>
