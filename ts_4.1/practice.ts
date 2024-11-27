// Задача 1: интерфейс Product с полями name, price и quantity. 
// Напишите функцию, которая принимает массив продуктов и возвращает их общую стоимость
interface IProduct {
    name: string,
    price: number,
    quantity: number,
    category: CATEGORY  // тип enum
}

// function getTotalPrice(products: IProduct[]): number {
//     return products.reduce((total, product) => total + (product.price * product.quantity), 0);
// }

// UPD: Нужно расширить интерфейс, полем category, которое может иметь 3 категории
// enum CATEGORY

enum CATEGORY {
    ELECTRONICS = 'electronics',
    CLOTHES = 'clothes',
    BOOKS = 'books'
} 

const arrayOfProducts: Array<IProduct> = [
    { 
        name: 'iPhone', 
        price: 1000, 
        quantity: 2, 
        category: CATEGORY.ELECTRONICS
    },
    {
        name: 'Sweater',
        price: 500,
        quantity: 1,
        category: CATEGORY.CLOTHES
    }
]

const result = getTotalPrice(arrayOfProducts);
console.log('Total price:', result);  

// UPD: Изменить функцию getTotalPrice - сделать дженерик-функцией, ограничинной до интерфейса IProduct
function getTotalPrice<T extends IProduct>(products: T[]): number {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
}

// Задача 2: Интерфейс User с полями id, username, email. 
// Затем создайте интерфейс Admin, который расширяет User, добавляя role
// Напишите функцию, которая принимает массив пользователей и возвращает массив администраторов
interface IUser {
    id: number,
    username: string,
    email: string
}

interface IAdmin extends IUser {
    role: string
}

function getAdmins(users: (IUser | IAdmin)[] ): IAdmin[] {
    // return users.filter(user => isAdmin(user));   // (user => isAdmin(user) - callback внутренний, но можно и напрямую передавать функцию вне и все сработает
    return users.filter(isAdmin); // vers 2
}

function isAdmin(user: IUser | IAdmin): user is IAdmin { // type guard - защитник типа, когда нужно понять админ или простой юзер
    return 'role' in user;
}

const arrayOfUsers = [
    { id: 1, username: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, username: 'Admin', email: 'admin@example.com', role: 'superadmin' }
]

// console.log(getAdmins(arrayOfUsers))

// Задача 3: тип customer с полями id, name, purchaseHistory (массив строк)
// Написать функцию, которая принимает массив покупателей и возвращает объект, где ключами являются их id клиентов, а значениями - их имена
type Customer = {
    id: number,
    name: string,
    purchaseHistory: string[]
}

function getCustomerObjects(customers: Array<Customer>): Record<Customer['id'], Customer['name']> {
    return customers.reduce((obj, customer) => {
        const {id, name} = customer // деструктуризация объекта
        obj[id] = name;          // присваивание объекту ключ и значение
        return obj;
    }, {} as Record<Customer['id'], Customer['name']>); // здесь типизация Record<Customer['id'], Customer['name']> нужна для нового объекта {}
}

const customersArray = [
    { id: 1, name: 'John Doe', purchaseHistory: ['Product A', 'Product B'] },
    { id: 2, name: 'Jane S', purchaseHistory: ['Product C', 'Product D'] }
]

console.log(getCustomerObjects(customersArray))

// Задача 4: Дженерик функция, принимающая на вход массив данных типа T и колбэк
// и возвращающая булевый ответ, все ли значения массива возвращают тру при вызове колбэка
// Если хотя бы 1 фолс - все функция должна вернуть фолс

function customEvery<T>(array: T[], callback: (element: T, index?: number, array?: T[]) => boolean): boolean {
    for (const element of array) {
        if (!callback(element)) return false;
    }
    return true
}

const numbersArray = [1, 2, 3, 4, 5];
// console.log(customEvery(numbersArray, (num) => num % 2 === 0)); 
console.log(customEvery(numbersArray, Boolean)); // передана функция булевая, работает так же как и колбэк

// Задача 5
/*
Напишите функцию, которая принимает массив URL и возвращает массив данных, полученных из этих URL с использованием fetch. 
Используйте async/await.
[
'https://jsonplaceholder.typicode.com/todos/1',
'https://jsonplaceholder.typicode.com/todos/3',
'https://jsonplaceholder.typicode.com/todos/5',
'https://jsonplaceholder.typicode.com/todos/7',
]
*/
/*
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
  */

interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

async function getDataFromUrl<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch response from ${url}`);
        }
        const jsonData = (await response.json()) as T;
        return jsonData;
    } catch (e: unknown) {
        throw new Error((e as Error).message);
    }
}

async function getDataFromEnpoints<T>(urls: string[]): Promise<T[]> {
    const arrayOfPromises = urls.map((url) => getDataFromUrl<T>(url));
    const result = await Promise.all(arrayOfPromises);
    return result;
}

getDataFromEnpoints<ITodo>([
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/3",
    "https://jsonplaceholder.typicode.com/todos/5",
    "https://jsonplaceholder.typicode.com/todos/7",
]).then((arr) => console.log(arr));