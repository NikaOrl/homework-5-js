/**
* Класс, объекты которого описывают параметры гамбургера. 
* 
* @constructor
* @param size        Размер
* @param stuffing    Начинка
*/
function Hamburger(size, stuffing) { 
  this.size = size;
  this.stuffing = stuffing;
} 

Hamburger.prototype.constructor = Hamburger;
  
/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = {price: 50, calories: 20, name: "small"}
Hamburger.SIZE_LARGE = {price: 100, calories: 40, name: "large"}
Hamburger.STUFFING_CHEESE = {price: 10, calories: 20, name: "cheese"}
Hamburger.STUFFING_SALAD = {price: 20, calories: 5, name: "salad"}
Hamburger.STUFFING_POTATO = {price: 15, calories: 10, name: "potato"}


 //Узнать размер гамбургера
Hamburger.prototype.getSize = function () {
  return this.size;
}

/** * Узнать начинку гамбургера */
Hamburger.prototype.getStuffing = function () {
  return this.stuffing;
}

/** * Узнать цену гамбургера
 * @return {Number} Цена в тугриках */
Hamburger.prototype.calculatePrice = function () {
  return this.getSize().price + this.getStuffing().price;
}

/** * Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
  return this.getSize().calories + this.getStuffing().calories;
}

 //Узнать тип бургера
Hamburger.prototype.getType = function () {
  return {price: this.calculatePrice(), calories: this.calculateCalories(), name: this.getSize().name + " burger with " + this.getStuffing().name};
}

/**
* Класс, от которого наследуют салат и напиток. 
* 
* @constructor
* @param type        Тип
*/

function DrinkAndSalad(type) {
  this.type = type;
}

DrinkAndSalad.prototype.constructor = DrinkAndSalad;

//Узнать тип напитка или салата
DrinkAndSalad.prototype.getType = function () {
  return this.type;
}

/**
* Класс, объекты которого описывают параметры напитка. 
*/
function Drink (type) { 
  DrinkAndSalad.call(this, type);
} 

Drink.prototype = Object.create(DrinkAndSalad.prototype);
Drink.prototype.constructor = Drink;
  
/* Тип напитка */
Drink.COFFEE = {price: 80, calories: 20, name: "coffee"}
Drink.COLA = {price: 50, calories: 40, name: "cola"}

/** * Узнать цену напитка
 * @return {Number} Цена в тугриках */
Drink.prototype.calculatePrice = function () {
  return this.getType().price;
}

/** * Узнать калорийность
 * @return {Number} Калорийность в калориях */
Drink.prototype.calculateCalories = function () {
  return this.getType().calories;
}

/**
* Класс, объекты которого описывают параметры салата. 
* 
* @constructor
* @param weight      Вес
*/

function Salad (type, weight) { 
  DrinkAndSalad.call(this, type);
  this.weight = weight;
} 

Salad.prototype = Object.create(DrinkAndSalad.prototype);
Salad.prototype.constructor = Salad; 
  
/* Тип салата */
Salad.CAESAR = {price: 100, calories: 20, name: "caesar"};
Salad.OLIVIE = {price: 50, calories: 80, name: "olivie"};

//Узнать вес салата
Salad.prototype.getWeight = function(){
  return this.weight;
}

/** * Узнать цену салата на 100г
 * @return {Number} Цена в тугриках */
Salad.prototype.calculatePrice = function () {
  return this.getType().price * this.getWeight() / 100;
}

/** * Узнать калорийность
 * @return {Number} Калорийность в калориях */
Salad.prototype.calculateCalories = function () {
  return this.getType().calories * this.getWeight() / 100;
}

/**
* Класс, объекты которого описывают параметры заказа. 
* 
* @constructor
* @param isPaid        Оплачен ли заказ
* @param dishes        Все добавленные блюда
*/

function Order(dishes){
  this.dishes = dishes;
  this.isPaid = false;
}

Order.prototype.constructor = Order;

/*Блюда в заказе*/
Order.prototype.getDishes = function(){
  return this.dishes;
}

/*Оплачен ли*/
Order.prototype.getIsPaid = function(){
  return this.isPaid;
}

Order.prototype.pay = function(){
  this.isPaid = true;
  return "Order is paid";
}

Order.prototype.addMeal = function(meal){
  if(!this.isPaid){
    this.dishes.push(meal);
    return meal.getType().name + " added"
  }
  else {
    return "Sorry, but you already paid for your order"
  }
}

Order.prototype.removeMeal = function(meal){
  if(!this.isPaid){
    if(this.dishes.indexOf(meal) != -1){
      this.dishes.splice(this.dishes.indexOf(meal), 1);
      return meal.getType().name + " removed"
    }
    else {
      return "Error! No " + meal.getType().name + " in your order";
    }
  }
  else {
    return "Sorry, but you already paid for your order"
  }
}

Order.prototype.calculateTotalPrice = function(){
  var totalPrice = 0;
  this.dishes.forEach(function(item){
    totalPrice += item.calculatePrice();
  });
  return "Price: " + totalPrice;
}

Order.prototype.calculateTotalCalories = function(){
  var totalCalories = 0;
  this.dishes.forEach(function(item){
    totalCalories+=item.calculateCalories();
  });
  return "Calories: " + totalCalories;
}

Order.prototype.orderInfo = function(){
  var str = "Your order: "
  this.dishes.forEach(function(item){
    str = str + item.getType().name + ", ";
  });
  console.log(str.slice(0, str.length - 2));
}

/**
* Пример работы программы
*/

var burger1 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD),
    drink1 = new Drink(Drink.COLA),
    salad1 = new Salad(Salad.CAESAR, 200),
    burger2 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE),
    drink2 = new Drink(Drink.COFFEE),
    salad2 = new Salad(Salad.OLIVIE, 150);

/*var order1 = new Order([burger1, drink1, salad1]);*/
var order2 = new Order([burger1, salad1, burger2, drink2, salad2]); //Составление заказа
/*order1.orderInfo();*/

order2.orderInfo(); //Вывод списка блюд в заказе

console.log(order2.calculateTotalCalories()); //Вывод суммы калорий

console.log(order2.calculateTotalPrice()); //Вывод цены за заказ

console.log(order2.removeMeal(drink2)); //Удаление напитка, который присутствует в заказе
order2.orderInfo();

console.log(order2.removeMeal(drink1)); //Удаление напитка, который отстуствует в заказе
order2.orderInfo();

console.log(order2.addMeal(drink1));  //Добавление напитка
order2.orderInfo();

console.log(burger1.calculatePrice()); //Цена одного из блюд

console.log(order2.getDishes()[2].calculatePrice()); //Цена одного из блюд в заказе

console.log(order2.pay());// Оплата заказа

console.log(order2.removeMeal(drink1)); //Удаление напитка, который отстуствует в заказе
order2.orderInfo();

console.log(order2.addMeal(drink1));  //Добавление напитка
order2.orderInfo();
