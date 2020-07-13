'use strict'
let pickedMenu = []; //get data using HTTPRequest

function loadMenuTable(){
    //using pickedMenu to load table to html
    let tableLoad = '';
    for(item in pickedMenu){
        tableload += item.name + item.price; //+ quantity (for calculations)
    }
}

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
            +"<td><input type='number' class='quantity' onchange='console.log(this.value)'</td>"
            +"<td class='subtotal'>0</td></tr>"
    });
    $('#ordermenu').innerHTML = sampleText;
}

/*
function subtotal(quantity, price, index){
     = (quantity*price).toFixed(2);
}

$('.quantity:nth-child()')
*/

const QUANTITY = $all('input[type=number]');
const SUBTOTAL = $all('.subtotal');

function update(index){

}


function load(){
     loadSampleMenu();
}