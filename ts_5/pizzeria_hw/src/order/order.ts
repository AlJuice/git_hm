import { Pizza } from '../meal/pizza';
import { DOUGH_TYPE, IMeal, PIZZA_SIZE, toppingsType } from '../data/types';
import { PIZZA_NAMES } from '../data/receipts';
import { ERROR_MESSAGES } from '../data/messages';

export class Order {
  private storageMeals: IMeal[] = [];
  constructor(public orderNumber: number, public meals: IMeal[] = []) {
    this.storageMeals.push(...meals)
  }

  addPizza(name: PIZZA_NAMES, basePrice: number, doughType: DOUGH_TYPE, size: PIZZA_SIZE, additionalToppings?: toppingsType[]) {
    const newPizza =  new Pizza(name, basePrice, doughType, size);
    if (additionalToppings) {
      newPizza.additionalToppings = [...additionalToppings];
    }
    if (!newPizza) throw new Error(ERROR_MESSAGES.PIZZA_NOT_FOUND);

    this.storageMeals.push(newPizza);
    return newPizza
  }

  getMeals(): IMeal[] {
    return this.storageMeals
  }

  // Возвращает полную стоимость заказа (сумма стоимости всех блюд)
  getFullPrice(): number {
    return this.storageMeals.reduce((sum, meal) => sum + meal.getPrice(), 0);
  }

  removeFromOrder(name: PIZZA_NAMES) {
    const pizzaIndex = this.storageMeals.findIndex(meal => meal.name === name);
    if (pizzaIndex === -1) throw new Error(ERROR_MESSAGES.PIZZA_NOT_FOUND);
    this.storageMeals.splice(pizzaIndex, 1);
  }
}
