"use strict";

interface IProduct {
    id: number,
    name: string,
    price: number,
    discount?: number
}

interface ICustomer {
    id: number,
    name: string,
    email: string
}

interface IOrderItem {
    product: IProduct,
    quantity: number
}

type OrderStatus = 'pending' |'shipped' | 'delivered'

interface IOrder {
    id: number,
    customer: ICustomer,
    items: IOrderItem[],
    status?: OrderStatus
}

function calculateTotal(order: IOrder) {
    return order.items.reduce((acc, { product: { discount, price }, quantity }) => {
        if (discount) {
            return acc + (price * (1 - discount / 100)) * quantity
        }
        return acc + price * quantity
    }, 0)
}

const product1: IProduct = {
    id: 1,
    name: 'Product 1',
    price: 1000,
    discount: 10
}
const product2: IProduct = {
    id: 2,
    name: 'Product 2',
    price: 2000
}

const order: IOrder = {
    id: 1,
    customer: {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com'
    },
    items: [
        {
            product: product1,
            quantity: 2
        },
        {
            product: product2,
            quantity: 1
        }
    ]
}

console.log(calculateTotal(order))

