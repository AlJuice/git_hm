import { Order } from "../order/order";
import { ERROR_MESSAGES } from '../data/messages';
import { IMeal } from '../data/types';

export class Pizzeria {
  private storageOrders: Order[] = [];
  constructor(public name: string, public address?: string,  public workingHours?: string, public orders?: Order[]) {
    if (orders) this.storageOrders.push(...orders)
  }

  createOrder(meals?: IMeal[]): Order {
    const orderNumber = Date.now();
    const newOrder = new Order(orderNumber, meals)
    this.storageOrders.push(newOrder);
    return newOrder;
  }

  getOrder(orderNumber: number): Order | null {
    return this.storageOrders.find(order => order.orderNumber === orderNumber) || null;
  }

  removeOrder(orderNumber: number): void {
    const index = this.storageOrders.findIndex(order => order.orderNumber === orderNumber);
    if (index === -1) throw new Error(ERROR_MESSAGES.ORDER_NOT_FOUND);
    this.storageOrders.splice(index, 1);
  }
}
