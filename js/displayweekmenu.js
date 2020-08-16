"use strict"

let displayMenu = new XMLHttpRequest();
displayMenu.open("get","/weekchosen",true);
displayMenu.onload = function(){
    let menuList = '';
    for(let item of JSON.parse(this.responseText)) {
        menuList += "<tr><td>" + item.weekItem + "</td></tr>";
    }
    select('#menu').innerHTML = menuList;
};
displayMenu.send();


let displayOrders = new XMLHttpRequest();
displayOrders.open("get", "/getorders", true);
displayOrders.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        let orderTable = '';
        let orderList = JSON.parse(this.responseText);
        if(orderList.length > 0){
        orderTable += '<thead><tr><th>Client</th><th>Address</th><th>Total</th></tr></thead>';
        }
        orderList.map(function(order){
            orderTable += '<tbody><tr>';
            orderTable += '<td>' + order.clientName + '</td>';
            orderTable += '<td>' + order.clientAddress + '</td>';
            orderTable += '<td>' + order.orderTotalPrice.toFixed(2) + '€</td>';
            orderTable += '</tr></tbody>';
        });
        select('#orderList').innerHTML = orderTable;


    }
};
displayOrders.send();
