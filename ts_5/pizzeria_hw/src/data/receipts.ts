import { PIZZA_SIZE, toppingsType } from '../data/types';

//Енам с названиями ваших пицц
export enum PIZZA_NAMES {
  MARGHERITA = 'Margherita',
  PEPPERONI = 'Pepperoni',
  HAWAIIAN = 'Hawaiian',
  FOURCHEESES = 'Four Cheeses',
  DIABLO = 'Diablo',
  MEAT = 'Meat',
  VEGGIE = 'Veggie'
}

export const pizzaReceipts: Record<
  PIZZA_NAMES,
  { toppings: toppingsType[]; prices: Record<PIZZA_SIZE, number> }
> = {
  [PIZZA_NAMES.MARGHERITA]: {
    toppings: ['cheese', 'tomatoes'],
    prices: {
      [PIZZA_SIZE.SMALL]: 50,
      [PIZZA_SIZE.MEDIUM]: 75,
      [PIZZA_SIZE.LARGE]: 100
    }
  },

  [PIZZA_NAMES.PEPPERONI]: {
    toppings: ['pepperoni', 'cheese'],
    prices: {
      [PIZZA_SIZE.SMALL]: 75,
      [PIZZA_SIZE.MEDIUM]: 100,
      [PIZZA_SIZE.LARGE]: 175
    }
  },

  [PIZZA_NAMES.HAWAIIAN]: {
    toppings: ['chicken', 'onions', 'pineapple'],
    prices: {
      [PIZZA_SIZE.SMALL]: 90,
      [PIZZA_SIZE.MEDIUM]: 120,
      [PIZZA_SIZE.LARGE]: 190
    }
  },

  [PIZZA_NAMES.FOURCHEESES]: {
    toppings: ['cheese', 'garlic'],
    prices: {
      [PIZZA_SIZE.SMALL]: 50,
      [PIZZA_SIZE.MEDIUM]: 75,
      [PIZZA_SIZE.LARGE]: 100
    }
  },

  [PIZZA_NAMES.DIABLO]: {
    toppings: ['meat', 'onions', 'chilliPeppers'],
    prices: {
      [PIZZA_SIZE.SMALL]: 85,
      [PIZZA_SIZE.MEDIUM]: 115,
      [PIZZA_SIZE.LARGE]: 185
    }
  },

  [PIZZA_NAMES.MEAT]: {
    toppings: ['meat', 'italianGreens', 'sausage'],
    prices: {
      [PIZZA_SIZE.SMALL]: 90,
      [PIZZA_SIZE.MEDIUM]: 120,
      [PIZZA_SIZE.LARGE]: 190
    }
  },

  [PIZZA_NAMES.VEGGIE]: {
    toppings: ['carrot', 'corn', 'eggplant'],
    prices: {
      [PIZZA_SIZE.SMALL]: 90,
      [PIZZA_SIZE.MEDIUM]: 120,
      [PIZZA_SIZE.LARGE]: 190
    }
  }
};
