import { PIZZA_NAMES, pizzaReceipts } from '../data/receipts';
import { PIZZA_SIZE, DOUGH_TYPE, toppingsType } from '../data/types';
import { Meal } from './meal';
import { TOPPINGS } from '../data/prices';

export class Pizza extends Meal {
  protected finalPrice: number;

  constructor(
    readonly name: PIZZA_NAMES,
    public basePrice: number,
    public doughType: DOUGH_TYPE,
    public size: PIZZA_SIZE,
    public additionalToppings?: toppingsType[]
  ) {
    super(name, basePrice);
    this.finalPrice = this.calculatePrice();
  }

  calculatePrice() {
    const basicToppingsPrice =
      pizzaReceipts[this.name].prices[this.size] +
      this.basePrice +
      pizzaReceipts[this.name].toppings.reduce(
        (sum, topping) => sum + TOPPINGS[topping],
        0
      );
    const additionalToppingsPrice =
      this.additionalToppings?.reduce(
        (acc, topping) => acc + TOPPINGS[topping],
        0
      ) || 0;
    return basicToppingsPrice + additionalToppingsPrice;
  }
}
