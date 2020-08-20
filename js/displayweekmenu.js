"use strict"

let sampleChosenMenu = [
    {weekItem: 'Summer Rolls', weekItemPrice: 5},
    {weekItem: 'Crispy Fried Noodles', weekItemPrice: 12},
    {weekItem: 'Leche Flan', weekItemPrice: 6}
];

let sampleWeekOrders = [
    {clientName: 'Marie Lenglet', clientAddress: 'Rue Haute 52, 1000 Bruxelles', orderTotalPrice: 25},
    {clientName: 'Alain Rousseau', clientAddress: 'Avenue Louise 345, 1000 Bruxelles', orderTotalPrice: 54}
];

function loadTables(){
    loadSampleMenu();
    loadSampleOrders();
}
function loadSampleMenu() {

    let menuList = '';
    for(let item of sampleChosenMenu) {
        menuList += "<tr><td>" + item.weekItem + "</td></tr>";
    }

    select('#menu').innerHTML = menuList;
}

function loadSampleOrders() {
    let orderTable = '';
    if (sampleWeekOrders.length > 0) {
        orderTable += '<thead><tr><th>Client</th><th>Address</th><th>Total</th></tr></thead>';
    }
    sampleWeekOrders.map(function (order) {
        orderTable += '<tbody><tr>';
        orderTable += '<td>' + order.clientName + '</td>';
        orderTable += '<td>' + order.clientAddress + '</td>';
        orderTable += '<td>' + order.orderTotalPrice.toFixed(2) + '€</td>';
        orderTable += '</tr></tbody>';
    });
    select('#orderList').innerHTML = orderTable;
}