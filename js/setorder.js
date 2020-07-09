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
    $('#ordermenu').innerHTML = sampleText;
}