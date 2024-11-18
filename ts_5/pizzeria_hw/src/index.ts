import { Pizzeria } from "./pizzeria/pizzeria"
import { PIZZA_NAMES } from "./data/receipts"
import { DOUGH_TYPE, PIZZA_SIZE } from "./data/types"

const pizzeria = new Pizzeria("Lisitsa");

const order = pizzeria.createOrder();

order.addPizza(PIZZA_NAMES.DIABLO, 150, DOUGH_TYPE.CLASSIC, PIZZA_SIZE.LARGE );
order.addPizza(PIZZA_NAMES.HAWAIIAN, 100, DOUGH_TYPE.CLASSIC, PIZZA_SIZE.LARGE, ["bacon", "basil"]);

console.log(`Заказ order: ${JSON.stringify(order.getMeals())}`);
console.log(`Финальная цена order: ${order.getFullPrice()}`);

const order2 = pizzeria.createOrder();

order2.addPizza(PIZZA_NAMES.VEGGIE, 140, DOUGH_TYPE.GLUTEN_FREE, PIZZA_SIZE.MEDIUM, ['eggplant', 'mushrooms'] )
order2.addPizza(PIZZA_NAMES.MARGHERITA, 100, DOUGH_TYPE.GLUTEN_FREE, PIZZA_SIZE.SMALL, ['basil'] )
order2.removeFromOrder(PIZZA_NAMES.MARGHERITA)

console.log(`Заказ order2: ${JSON.stringify(order2.getMeals())}`);
console.log(`Финальная цена order2: ${order2.getFullPrice()}`);
