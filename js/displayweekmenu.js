"use strict"

let displayMenu = new XMLHttpRequest();
displayMenu.open("get","/weekchosen",true);
displayMenu.onload = function(){
    let menuList = '';
    for(let item of JSON.parse(this.responseText)) {
        menuList += "<tr><td>" + item.weekItem + "</td></tr>";
    }
    $('#menu').innerHTML = menuList;
};
displayMenu.send();

/*
let displayOrders = new XMLHttpRequest();
displayOrders.open();
displayOrders.onload = function(){};
displayOrders.send();
*/