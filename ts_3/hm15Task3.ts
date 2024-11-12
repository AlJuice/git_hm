"use strict";


class GenericStorage<T extends { id: number }> {
    private storage: T[] = []

    constructor(...items: T[]){
        this.storage.push(...items);
    }

    public add(element: T | Omit<T, "id">) {
        if ("id" in element) {
          this.storage.push(element);
        } else {
          const newItem = { ...element, id: Date.now() } as T;
          this.storage.push(newItem);
        }
    }

    public update(item: Partial<T> & Pick<T, "id">) {
        const index = this.getIndexById(item.id);
        if (index === -1) throw new Error(`Element with id: ${item.id} was not found`);

        this.storage[index] = { ...this.storage[index], ...item };
    }

    public remove(id: number) {
        const index = this.getIndexById(id);
        if (index === -1) throw new Error(`Element with id: ${id} was not found`);

        this.storage.splice(index, 1);
    }

    public getById(id: number) {
        const index = this.getIndexById(id);
        return index === -1 ? null : this.storage[index];
    }

    public getAll() {
        return this.storage;
    }

    private getIndexById(id: number) {
        return this.storage.findIndex((el) => el.id === id);
    }
}

interface IUser {
    name: string;
    age: number;
    surname: string;
    id: number;
}
  
type User = { id: number; name: string; age: number };
const storage = new GenericStorage<User>();

// Добавление объектов
storage.add({ id: 1, name: "Anatoly", age: 33 }); // Объект с id
storage.add({ name: "Elena", age: 25, id: 2 }); // Объект без id, id сгенерируется автоматически

// Обновление объектов
storage.update({ id: 1, name: "Egor" }); // Обновление имени пользователя с id 1
storage.update({ id: 2, name: "Tatiana", age: 33 }); // Обновление имени и возраста пользователя с id 2

// Получение объектов
console.log(storage.getById(1)); // { id: 1, name: 'Egor', age: 33 }
console.log(storage.getAll()); // [{ id: 1, name: 'Egor', age: 33 }, { id: 2, name: 'Tatiana', age: 33 }]

// Удаление объектов
storage.remove(2);
console.log(storage.getAll()); // [{ id: 1, name: 'Egor', age: 33 }]

