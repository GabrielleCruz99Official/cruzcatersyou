'use strict'

let sampleMenu = [
    {id: 'APP01', name: 'Salad', price: 5},
    {id: 'ENT01', name: 'Carbonara', price: 12},
    {id: 'DES01', name: 'Cake', price: 8}
];

function loadSampleMenu(){
    let sampleText = '';
    sampleMenu.map(function(x, index){
        sampleText += "<tr><td>" + x.name + "</td><td class='price'>"
            + x.price + "€</td>"
            +"<td><input type='number' class='quantity' value='0' onchange='subtotal(this.value," + x.price + "," + index +")'</td>"
            +"<td class='subtotal'>0</td></tr>"
    });
    sampleText += "<tr><td></td><td></td><td id='totalRight'>Total:</td><td class='total'></td></tr>"
    $('#ordermenu').innerHTML = sampleText;
}
/*
let chosenMenu = [];
let pickedMenu = new XMLHttpRequest(); //get data using HTTPRequest
pickedMenu.open("get", "/weekchosen", true);
pickedMenu.onload = function(){
    chosenMenu = JSON.parse(this.responseText);
}
pickedMenu.send();

function loadMenu(){
    let chosenTable = '';
    chosenMenu.map(function(x, index){
        chosenTable += "<tr><td>" + x.menuItem + "</td><td class='price'>"
            + x.menuItemPrice + "€</td>"
            +"<td><input type='number' class='quantity' value='0' onchange='subtotal(this.value," + x.menuItemPrice + "," + index +")'</td>"
            +"<td class='subtotal'>0</td></tr>"
    });
    chosenTable += "<tr><td></td><td></td><td id='totalRight'>Total:</td><td class='total'></td></tr>"
    $('#ordermenu').innerHTML = chosenTable;
}
*/
let SUBTOTAL = $all('.subtotal');

function updateQuery(){
    SUBTOTAL = $all('.subtotal');
}

function subtotal(quantity, price, index){
    updateQuery();
    SUBTOTAL[index].textContent = (quantity * price).toFixed(2);
    updateTotal();
}

function updateTotal(){
    let total = 0;
    for(let i=0;i<SUBTOTAL.length;i++){
        total += parseFloat(SUBTOTAL[i].innerHTML);
    }
    $('.total').innerHTML = total.toFixed(2);
}

function load(){
     loadSampleMenu();
     //loadMenu();
}

function addOrder(form){
    alert("Order has been confirmed!");
    window.location.replace("/");
}