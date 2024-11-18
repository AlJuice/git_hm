import { PIZZA_NAMES } from '../data/receipts';
import { TOPPINGS } from '../data/prices';

/*
Поле name которое нельзя менять
метод getPrice возвращающий число
*/
export interface IMeal {
    readonly name: PIZZA_NAMES, 
    getPrice(): number
}

// Енам с видами теста
export enum DOUGH_TYPE {
  CLASSIC = 'Classic',
  GLUTEN_FREE = 'Gluten Free', 
}

// Енам с размерами пиццы
export enum PIZZA_SIZE {
  SMALL,
  MEDIUM,
  LARGE,
}

export type toppingsType = keyof typeof TOPPINGS

