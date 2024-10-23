"use strict";


// Задача 1: Создать класс Person, который будет иметь name, age, прокидывающиеся извне
// Задача 2: Создать метод в классе, который возвращает приветствие с именем класса

class Person {
    // статику принято писать в самом верху
    static compareAges(person1, person2){
        if (!(person1 instanceof Person) || !(person2 instanceof Person) ){
            throw new Error('Persons are not instance of Person')
        }
        if (person1.age > person2.age){
            return `${person1.name} is older`
        }
        else if (person2.age > person1.age){
            return `${person2.name} is older`
        }
        else {
            return `${person2.name} has same age as ${person1.name} `
        }
    }

    #projects = []
    constructor(name, age, projects = []){
        this.name = name
        this.age = age
        this.setProjects(projects)
    }

    getProjects(){
        return this.#projects
    }

    setProjects(project = []){
        // нужно удостовериться, что проекты это массивы, и массивы приходят строковые
        if (!(Array.isArray(project)) || project.some(el => typeof el !== 'string') ){
            throw new Error('Invalid projects')
        }
        this.#projects.push(...project)
    }

    get name(){
        return this._name
    }
    set name(name){
        if (typeof name !== 'string'){
            throw new Error('Invalid name')
        }
       this._name = name
    }
    get age(){
        return this._age
    }
    set age(age){
        if (typeof age !== 'number'){
            throw new Error('Invalid age')
        }
        return this._age
    }
    greet(){
        return `Hello, I'm ${this.name}, my age ${this.age}`
    }
}
// const person1 = new Person('Al', 28)
// console.log(person1)
// console.log(person1.greet())

// const person2 = new Person(21, "28")
// console.log(person2.greet())

// Задача 3: Нужен еще один класс, который будет иметь доп поле student_id
class Student extends Person {
    #studentId
    constructor(name, age, studentId){
        super(name, age)
        this.#studentId = studentId
    }
    study(){
        return `student ${this.name} is studying`
    }
}
const student1 = new Student('Charlie', 20, 'S1234')
// console.log(student1.greet())
// console.log(student1.study())

// Задача 4: добавить в классе Person статический метод, который принимает два объекта,
// являющиеся инсnансом Person, и сравнивает их возраста 
const person2 = new Person('David', 30, ['CAT'])
const person3 = new Person('Eve', 25)
// console.log(Person.compareAges(person2, person3))

// Задача 5: В класс Person добавили доп поле - поле будет являться массивом проектов, которые были созданы персоном
// В конструкторе мы можем принимать массив проектов, может быть пустым при создании 
// Извне обращаться к проектам можно только через метод getProjects, setProjects
// Напрямую обращаться к проектам напрямую нельзя никак
person3.setProjects(["KPI", "Ectool"])
console.log(person3.getProjects())
console.log(person2.getProjects())

// Библиотека
/*
Необходимо создать систему управления библиотекой с использованием классов. 
Используйте все знания, которые вы приобрели о классах, в том числе про приватные/публичные методы и поля.
Описание задания:
Ваша задача — реализовать две основные сущности: Библиотека и Книга. 
В рамках этого задания вам нужно создать классы, которые позволят управлять книгами в библиотеке. 
Библиотека должна иметь возможность добавлять новые книги, получать информацию о книгах по различным параметрам, 
удалять книги и выводить список всех книг.
*/
const crypto = require("crypto");
class Library {
  #books = [];
  #name;
  #address;
  constructor(name, address) {
    this.#name = name;
    this.#address = address;
  }
  getName() {
    return this.#name;
  }
  setName(name) {
    if (typeof name !== "string") {
      throw new Error("Invalid library name");
    }
    this.#name = name;
  }
  getAddress() {
    return this.#address;
  }
  setAddress(address) {
    if (typeof address !== "string") {
      throw new Error("Invalid library address");
    }
    this.#address = address;
  }
  addBook({ title, author, genre }) {
    const book = new Book(crypto.randomUUID(), title, author, genre);
    this.#books.push(book);
  }
  getBookByTitle(title) {
    return this.#books.find((book) => book.getTitle() === title);
  }
  getBooksByAuthor(author) {
    return this.#books.filter((book) => book.getAuthor() === author).map((book) => book.getDetails());
  }
  getAllBooks() {
    return this.#books.map((book) => book.getDetails());
  }
  removeBook(bookTitle) {
    const index = this.#getBookIndex(bookTitle);
    if (index === -1) {
      console.log(`Not found book with ${bookTitle} title`);
    } else {
      this.#books.splice(index, 1);
    }
  }
  #getBookIndex(title) {
    return this.#books.findIndex((book) => book.getTitle() === title);
  }
}

class Book {
    #id;
    #title;
    #author;
    #genre;

    constructor(id, title, author, genre) {
      this.#id = id;
      this.#setTitle(title);
      this.#setAuthor(author);
      this.#setGenre(genre);
    }

    getId() {
      return this.#id;
    }

    getDetails() {
      return {
        title: this.#title,
        author: this.#author,
        genre: this.#genre,
      };
    }

    getGenre() {
      return this.#genre;
    }

    getTitle() {
      return this.#title;
    }

    getAuthor() {
      return this.#author;
    }

    #setAuthor(author) {
      if (typeof author !== "string") {
        throw new Error("Invalid author");
      }
      this.#author = author;
    }

    #setTitle(title) {
      if (typeof title !== "string") {
        throw new Error("Invalid title");
      }
      this.#title = title;
    }

    #setGenre(genre) {
      if (typeof genre !== "string") {
        throw new Error("Invalid genre");
      }
      this.#genre = genre;
    }
}

const library = new Library("JS Library", "Super street 1");
library.addBook({ title: "JS for dumns", author: "HZ", genre: "Science fiction" });
library.addBook({ title: "Python for noone", author: "HZ", genre: "Science fiction" });
library.addBook({ title: "Physics", author: "Landau", genre: "Physics" });
library.addBook({ title: "Как тестируют в Гугл", author: "Tacker", genre: "Testing" });
console.log(library.getAllBooks());
console.log(library.getBookByTitle("Physics").getDetails());
console.log(library.getBooksByAuthor("HZ"));
library.removeBook("Python for noone");
console.log(library.getAllBooks());
