
// SOLID - 5 принципов
// Позволяют пистать код более грамотно и более чисто, код с принципами проще масштабировать

// 1. Single Responsibility - принцип разделения ответственности
// Любой класс, метод должен отвечать только за то, для чего был создан
// Одна функция - одно действие, одна обязанность.
function getSum (a: number, b: number): number {
    const result = a + b
    return result
}

function logResult1 (result: unknown) {
    console.log(`Result: ${result}`)
}

const result = getSum(1,2)
logResult1(result)
// функция getSum занимается вычислением, а функция logResult логгированием.
// Тут происходит разделение по обязанностям.

class PizzeriaOne {
    private orders: { price: number, meals: { price: number}[]}[] = []
    // должна ли пиццерия отвечать за то, как каждый заказ считает свои продукты? 
    // Нет, нужно это сделать через отдельный класс Order, тк заказ знает какие в нем заказаны блюда и их стоимость
    // Для рецептов блюд тоже нужен отдельный класс Meal, тк только в рецептах описаны ингредиенты и их топпинги
    getTotalPrice(){
        return this.orders.reduce((sum, order) => sum + order.price, 0)
    } 
}

// 2. Open\Closed principle 
// Классы должны быть открыты для расширения, но закрыты для модификации. Т.е максимально абстрагироваться от изменении в классах,
// а все модификации добавлять лучше через наследование в классах наследниках

interface IMeal {
    calculatePrice(): number
}

class PizzaOne implements IMeal {
    constructor(public name: string, public size: string, public topings: string[]){
        this.calculatePrice()
    }
    calculatePrice() {
        return 5;
    }
}

// Когда появилась скидка, то создаем новый класс-наследник, чтобы не плодить баги видоизменением родительского
class DiscountPizza extends PizzaOne {
    private discount: number
    constructor(name: string, size: string, topings: string[], discount: number){
        super(name, size, topings)
        this.discount = discount
    }
    calculatePrice() {
        const basePrice = super.calculatePrice()
        return basePrice * (this.discount / 100)
    }
}

class OrderOne {
    private meals: IMeal[] = []
    getTotalPrice() {
        return this.meals.reduce((sum, meal) => sum + meal.calculatePrice(), 0)
    }
}

// Expample 2

type ShippingMethod = "ground" | "air" | "pick up";

class OrderThree {
  id: number;
  items: string[];
  shipping: ShippingMethod;

  constructor(id: number, items: string[], shipping: ShippingMethod) {
    this.id = id;
    this.items = items;
    this.shipping = shipping;
  }

  getTotalCost(): number {
    // calculates total cost
    return 5;
  }
  getShippingCosts(): number {
    const totalCost = this.getTotalCost();
    const shipping = getShipping(this.shipping);
    const shippingCost = shipping.getShippingCosts(totalCost);
    return shippingCost;
  }
}

interface Shipping {
  getShippingCosts(totalCost: number): number;
}

class Ground implements Shipping {
  getShippingCosts(totalCost: number): number {
    return totalCost > 50 ? 0 : 5.95;
  }
}

class Air implements Shipping {
  getShippingCosts(): number {
    return 10.95;
  }
}

class PickUpInStore implements Shipping {
  getShippingCosts(): number {
    return 0;
  }
}

function getShipping(method: ShippingMethod) {
  if (method === "air") {
    return new Air();
  } else if (method === "ground") {
    return new Ground();
  } else {
    return new PickUpInStore();
  }
}

// 3. Liskov Substitution Principle (LSP)
// Всегда должна быть возможность заменить класс наследника - родителем и наоборот, и код должен не сломаться

class PizzaTwo {
    constructor(public name: string, public size: string, public toppings: string[]){}
    calculatePrice(): number{
        return 10 // Базовая цена
    }
}

class SpecialPizza extends PizzaTwo {
    calculatePrice(): number {
        return super.calculatePrice() + 10
    }
}

// Этот класс не реализовывает метод родительского класса, и нарушит логику класса Order, тк на выходе у нее never и кидает ошибку!
// Поэтому всегда классы наследники должны повторять типизацию входных и выходных данных родительского класса
class FreePizza extends PizzaTwo {
    calculatePrice(): number /* never */ {
        // throw new Error ('Pizza is free')
        return 0
    }
}

class OrderTwo {
    constructor(private meals: PizzaTwo[] = []){}
    getTotalPrice() {
        return this.meals.reduce((sum, meal) => sum + meal.calculatePrice(), 0)
    }
}

const margherita = new PizzaTwo("Margherita", "Medium", ["Cheese", "Tomato"]);
const special = new SpecialPizza("Special", "Large", ["Cheese", "Bacon"]);
const free = new FreePizza("Special", "Large", ["Cheese", "Bacon"]);
const order = new OrderTwo([margherita, special, free]);
console.log(order.getTotalPrice());

// 4. Interface Segregation - принцип разделения интерфейсов
// Клиенты\классы не должны быть вынуждены зависеть от методов, которые они не используют. Все должно быть разделено на ответственности.
// Интерфейсы должны реализовывать только те методы, которые нужны только данной сущности.
// Лучше всегда делить интерфейсы на мелкие (атомарные), чтобы они содержали только те методы, которые нужны сущностям
// и обьединять их через объединение типов, или расширять их и прочее.
interface IMeal {
    calculatePrice(): number
    // calculateDiscount(): number  // излишний метод для обычный пицц, тк не все пиццы имеют скидки
}

class PizzaFour implements IMeal {
    calculatePrice(): number {
        throw new Error("Method not implemented.");
    }
    calculateDiscount() {
        throw new Error("There is no discount for such pizza.");
    }
}

interface IMenuManagement {
  addPizza(name: string, toppings: string[]): void;
  removePizza(name: string): void;
}

interface IDeliveryManagement {
  deliverOrder(orderId: number): void;
}

class OrderFour implements IMenuManagement {
  addPizza(name: string, toppings: string[]): void {}

  removePizza(name: string): void {}
}

class PizzeriaThree implements IDeliveryManagement {
  deliverOrder(orderId: number): void {
    throw new Error("Method not implemented.");
  }
}

// 5. Dependency Inversion - принцип инверсии зависимостей
// Модули верхнего уровня не должны зависеть от модулей нижнего уровня, они должны зависеть от абстракции
// Потому что классы могут меняться, а абстракции - общие шаблоны для сущностей

interface IMeal {
    calculatePrice(): number
}

class Pizza implements IMeal {
    constructor(public name: string, public price: number, public toppings: string[]) {}
    calculatePrice(): number {
        return 10 // Базовая цена
    }
}

class Burger implements IMeal {
    constructor(public name: string, public price: number, public meat: string){}
    calculatePrice(): number {
        return 5
    }
}

interface IOrder {
    addMeal(meal: IMeal): void
    getTotalPrice(): number
}

// В классе Order блюда зависят от абстракции IMeal
class Order implements IOrder {
    private meals: IMeal[] = []
    constructor(...meals: IMeal[]){
        this.meals.push(...meals)
    }
    addMeal(meal: IMeal){
        this.meals.push(meal)
    }
    getTotalPrice() {
        return this.meals.reduce((sum, meal) => sum + meal.calculatePrice(), 0)
    }
}

function getOrder(...meals: IMeal[]): IOrder {
    return new Order(...meals)
}

// Тут тоже самое, заказы зависят от абстракции IOrder, не взаимодействуя напрямую с классом Order
class PizzeriaTwo {
    private orders: IOrder[] = []
    constructor (orders: IOrder[]){
        this.orders.push(...orders)
    }

    addOrder(meals: IMeal[]){
        // this.orders.push(new Order()) // тут завязываемся на класс Order, а нам нужно на абстракцию
        this.orders.push(getOrder(...meals)) // теперь уже ориентируемся на интерфейс IMeal
    }
}
// Такой код взаимозаменяем
// Пиццерия - высший уровень и не должна зависеть от класса заказа, и пицца уже нижний уровень. Интерфейсы - связующие их вещи.
// Мы делаем зависимость от абстракции, и любое расширение идет через наследование или имплементацию, каждый класс имеет только свои методы


// Паттерны проектирования
// Стандартизированные подходы для минимизации проблем во время работы с кодом
// Паттерны - концепция решений для той или иной проблемы

// Порождающие паттерны (ооп паттерны) - фабричный метод (фабрика), строители, прототип, одиночка (singleton)
// Структурные паттерны - адаптер, мост, компановщик, декоратор, фасад, легковес, заместитель 
// Поведенческие паттерны - состояние, стратегия, шаблонный метод, команда, цепочка обязанностей, итератор, медиатор, обзервед, визитор

// Порождающие паттерны.
// Фабрика, или фабричный метод - решает проблему создания различных продуктов без указания классов продуктов
// Factory Method

interface PaymentMethod {
    pay(amount: number): void
}

class CreditCardPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log(`Paying with credit card. Amount: ${amount}`);
    }
}

class CashPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log(`Paying with cash. Amount: ${amount}`);
    }
}

class CryptoPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Processing cryptocurrency payment of $${amount}`);
  }
}

class Shop {
    async makePayment(amount: number, type: PaymentType) {
        const paymentObject = PaymentFactory.createPaymentMethod(type)
        await paymentObject.pay(amount);
    }
}

enum PaymentType {
    CreditCard,
    Cash,
    Crypto
}

// это как раз Factory
class PaymentFactory {
  static createPaymentMethod(type: PaymentType): PaymentMethod {
    switch (type) {
      case PaymentType.CreditCard:
        return new CreditCardPayment();
      case PaymentType.Cash:
        return new CashPayment();
      case PaymentType.Crypto:
        return new CryptoPayment();
      default:
        throw new Error("Unknown payment type");
    }
  }
}

// Example 2
interface IMeal {
  calculatePrice(): number;
}

class PizzaFive implements IMeal {
  constructor(public name: string, public size: string, public toppings: string[]) {}
  calculatePrice() {
    return 10; // Базовая цена
  }
}

class SpecialPizzaTwo extends PizzaFive {
  calculatePrice(): number {
    return super.calculatePrice() + 10;
  }
}

class FreePizzaTwo extends PizzaFive {
  calculatePrice(): number {
    // throw new Error("Pizza is free!");
    return 0; //
  }
}

class OrderFive {
  constructor(private meals: PizzaFive[] = [], private pizzaFactory = new PizzaFactory()) {}
  getTotalPrice() {
    return this.meals.reduce((sum, meal) => sum + meal.calculatePrice(), 0);
  }

  addPizza(name: string, size: string, toppings: string[], pizzaType: "regular" | "special" | "free") {
    const pizza = this.pizzaFactory.getPizza(name, size, toppings, pizzaType);
    this.meals.push(pizza);
  }
}

class PizzaFactory {
  getPizza(name: string, size: string, toppings: string[], pizzaType: "regular" | "special" | "free") {
    if (pizzaType === "regular") {
      return new PizzaFive(name, size, toppings);
    } else if (pizzaType === "special") {
      return new SpecialPizzaTwo(name, size, toppings);
    } else {
      return new FreePizzaTwo(name, size, toppings);
    }
  }
}

// Builder - паттерн строитель - используется для создания объектов со сложными структурами, сущностями
// Например, дом содержит в себе комнаты, крышу, полы, стены и прочее.
// Example 1

class Room {
  constructor(public name: string, public width: number, public length: number) {}
  getArea(): number {
    return this.width * this.length;
  }
}

// Класс, описывающий дверь
class Door {
  constructor(public type: string) {}
}

class House {
  constructor(
    public wallsMaterial: string,
    public foundationType: string,
    public baseWidth: number,
    public baseLength: number,
    public roofMaterial: string,
    public windowsType: string,
    public doors: Door[],
    public rooms: Room[],
    public hasGarage: boolean,
    public hasGarden: boolean
  ) {}

  getTotalArea(): number {
    return this.rooms.reduce((totalArea, room) => totalArea + room.getArea(), 0);
  }

  getDescription(): string {
    return `House with a ${this.foundationType} foundation, made of ${this.wallsMaterial}, with base dimensions ${
      this.baseWidth
    }x${this.baseLength} meters. It has ${this.rooms.length} rooms, ${this.windowsType} windows, and a ${
      this.roofMaterial
    } roof. ${this.hasGarage ? "Includes a garage." : "No garage included."} ${
      this.hasGarden ? "Has a beautiful garden." : "No garden."
    } Doors: ${this.doors.map((door) => door.type).join(", ")}.`;
  }
}

// в билдер в конструкторе добавляются базовые обязательные поля
class HouseBuilder {
  private roofMaterial: string = "Tile";
  private windowsType: string = "Double-glazed";
  private doors: Door[] = [];
  private rooms: Room[] = [];
  private hasGarage: boolean = false;
  private hasGarden: boolean = false;
  constructor(
    private wallsMaterial: string,
    private foundationType: string,
    private baseWidth: number,
    private baseLength: number
  ) {}

  setRoofMaterial(roofMaterial: string) {
    this.roofMaterial = roofMaterial;
    return this;
  }

  setWindowsType(windowsType: string): HouseBuilder {
    this.windowsType = windowsType;
    return this;
  }

  addRoom(name: string, width: number, length: number): HouseBuilder {
    const room = new Room(name, width, length);
    this.rooms.push(room);
    return this;
  }

  addDoor(type: string): HouseBuilder {
    const door = new Door(type);
    this.doors.push(door);
    return this;
  }

  addGarage(): HouseBuilder {
    this.hasGarage = true;
    return this;
  }

  addGarden(): HouseBuilder {
    this.hasGarden = true;
    return this;
  }

  build(): House {
    return new House(
      this.wallsMaterial,
      this.foundationType,
      this.baseWidth,
      this.baseLength,
      this.roofMaterial,
      this.windowsType,
      this.doors,
      this.rooms,
      this.hasGarage,
      this.hasGarden
    );
  }
}

const luxuryHouse = new HouseBuilder("Brick", "Concrete", 10, 8)
  .setRoofMaterial("Slate")
  .setWindowsType("Triple-glazed")
  .addRoom("Living Room", 6, 5)
  .addRoom("Bedroom", 4, 4)
  .addRoom("Kitchen", 3, 3)
  .addDoor("Wooden front door")
  .addDoor("Sliding glass patio door")
  .addGarage()
  .addGarden()
  .addRoom("Children room", 3, 2)
  .build();

console.log(luxuryHouse);
console.log(luxuryHouse.getDescription());
console.log("Total Area of the House:", luxuryHouse.getTotalArea(), "sq meters");

// Можно билдер использовать для fetch, апишных запросов, для создания к ним структуризации для реквестов 
// т.е он будет конструировать грамотный апишный запрос
// Билдер по сути упрощает взаимодействие при создании объектов на верхнем уровне 
// Инкапсуляция создания объектов сложных сущностей

// Билдер для пиццы
class PizzaSix {
  constructor(
    public name: string,
    public basePrice: number,
    public size: "small" | "medium",
    public additionalToppings: string[],
    public extraBoard?: string
  ) {}
}

class PizzaBuilder {
  private additionalToppings: string[] = [];
  private extraBoard: string | undefined = undefined;
  constructor(private name: string, private basePrice: number, private size: "small" | "medium") {}

  addTopping(topping: string) {
    this.additionalToppings.push(topping);
    return this;
  }

  addExtraBoard(board: string) {
    this.extraBoard = board;
    return this;
  }

  build() {
    return new PizzaSix(this.name, this.basePrice, this.size, this.additionalToppings, this.extraBoard);
  }
}

const pizza = new PizzaBuilder("Margareta", 50, "medium")
  .addTopping("Pepper")
  .addTopping("Onion")
  .addTopping("Bacon")
  .addExtraBoard("Hot-dog")
  .build();


// Singleton - 
// нужно в коде иметь только единственный экземпляр класса. 
// И при каждом вызове будет возвращаться к одному и тому же объекту
// И можно даже обращаться из любых мест - и он отдаст текущую созданную версию объекта
// Например, коннект к бд

class Pizzeria {
    // static поля - относятся к самому классу, т.е вызываются у самого класса, но не их экземпляров
    private static instance: Pizzeria // хранит в себе объект первый созданный
    private orders: { price: number, meals: { price: number }[] }[] = []
    constructor (public readonly name: string, public readonly address: string){
        if (Pizzeria.instance){   // если первый объект был создан
            return Pizzeria.instance // возвращаем только его
        }
        Pizzeria.instance = this // создаем первый объект класса
    }
}

const pizzeria1 = new Pizzeria("Lisitsa", "Pobediteley 1")
const pizzeria2 = new Pizzeria("Dominos", "Nevskyy 5")
console.log(pizzeria1)
console.log(pizzeria2) // отображается только первый объект, тот, что был создан первым
// У нас была создана самая первая пиццерия, и больше уже не будет создаваться новых пиццерий
// Тк объект будет возвращаться самый первый везде при вызове класса
// Используется для cucumber

// Decorator
// Декоратор
// Оборачивать действия наших функции какие-то доп. действия
// У декоратора есть пост и пред кондишины - выполнение до и после основного кода функции
// Добавляет доп. функции для функции без изменения кода
class Calculator {
    @logResult
    add (a: number, b: number) {
        return a + b
    }
}

// const c = addAndLog(1, 2)
// Пример того,то как декоратор действует изнутри
// function addAndLog(a: number, b: number){
//     const c = new Calculator()
//     const result = c.add(2, 3)
//     return result
// }

// Сам декоратор
// Может добавить пред и после действия для основной функции
function logResult(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value
    descriptor.value = (...args: any[]) => {
        // log(target)
        // log(propertyKey)
        // log(descriptor)
        const result = originalMethod.apply(this, args)
        // log(`Adding ${args[0]} and ${args[1]} returns ${result}`)
        return result
    }
}

const c = new Calculator()
// c.add(1, 2)

const result3 = c.add(1, 2);
const result2 = c.add(3, 5);
console.log(result3);
console.log(result2);

