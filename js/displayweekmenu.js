"use strict"

let displayMenu = new XMLHttpRequest();
displayMenu.open("get","/weekchosen",true);
displayMenu.onload = function(){
    
};
displayMenu.send();

/*
let displayOrders = new XMLHttpRequest();
displayOrders.open();
displayOrders.onload = function(){};
displayOrders.send();
*/