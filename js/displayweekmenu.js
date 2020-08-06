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


let displayOrders = new XMLHttpRequest();
displayOrders.open("get", "/getorders", true);
displayOrders.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        let orderList = JSON.parse(this.responseText);
        console.log(orderList);
        let orderTable = '';
        orderList.map(function(order){
            orderTable += '<tr>';
            orderTable += '<td>' + order.clientName + '</td>';
            orderTable += '<td>' + order.clientAddress + '</td>';
            orderTable += '<td>' + order.orderTotalPrice.toFixed(2) + '€</td>';
            orderTable += '</tr>';
        });
        $('#orderList').innerHTML = orderTable;


    }
};
displayOrders.send();
