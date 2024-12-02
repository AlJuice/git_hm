import { TOPPINGS } from '../data/prices';

export interface IMeal {
  readonly name: string; // абстрактный класс должен принимать тоже абстрактные типы данных
  getPrice(): number;
}

// Енам с видами теста
export enum DOUGH_TYPE {
  CLASSIC = 'Classic',
  GLUTEN_FREE = 'Gluten Free'
}

// Енам с размерами пиццы
export enum PIZZA_SIZE {
  SMALL,
  MEDIUM,
  LARGE
}

export type toppingsType = keyof typeof TOPPINGS;
