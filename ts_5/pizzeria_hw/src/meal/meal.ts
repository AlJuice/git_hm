import { IMeal } from '../data/types';
import { PIZZA_NAMES } from '../data/receipts';

export abstract class Meal implements IMeal {
  protected finalPrice: number;
  constructor(
    readonly name: PIZZA_NAMES,
    protected basePrice: number
  ) {
    this.finalPrice = this.calculatePrice();
  }

  getPrice(): number {
    return this.finalPrice;
  }

  abstract calculatePrice(): number;
}
