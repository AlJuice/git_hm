"use strict";
async function createTodo(body = {}){
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if (response.status !== 200 && response.status !== 201) throw new Error('Status response isnt 200 or 201!')
        const data = await response.json()
        for (const key in body) { // все, что есть в object body, который мы посылаем
            if (!(key in data)){ // ключи, которые есть в object data, который мы получаем от бэка
                throw new Error(`The key:"${key}" - hasn't found in response object`);
            }
            if (body[key] !== data[key]) {
                throw new Error(`The objects have different values`);
            }
        }
        return data;
    }
    catch (err){
        console.error(`Response failed with error: "${err.message}"`)
    }
    finally {
        console.log('Function finished')
    }
    
}

const todo1 = {
    userId: 1,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: true
};

createTodo(todo1).then(finResult => console.log(finResult))
