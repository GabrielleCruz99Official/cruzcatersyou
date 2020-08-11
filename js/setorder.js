'use strict'
/*
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
*/

let chosenMenu = [];
let pickedMenu = new XMLHttpRequest(); //get data using HTTPRequest
pickedMenu.open("get", "/weekchosen", true);
pickedMenu.onload = function(){
    chosenMenu = JSON.parse(this.responseText);
}
pickedMenu.send();

function loadMenu(){
    let chosenTable = '';
    chosenMenu.map(function(menu, index){
        chosenTable += "<tr><td>" + menu.weekItem + "</td><td class='price'>"
            + menu.weekItemPrice + "€</td>"
            +"<td><input type='number' class='quantity' min='0' value='0' onchange='subtotal(this.value," + menu.weekItemPrice + "," + index +")'</td>"
            +"<td class='subtotal'>0</td></tr>"
    });
    chosenTable += "<tr><td></td><td></td><td id='totalRight'>Total:</td><td class='total'></td></tr>"
    $('#ordermenu').innerHTML = chosenTable;
}

let SUBTOTAL = $all('.subtotal');
let QUANTITY = $all('.quantity');

function updateQuery(){
    SUBTOTAL = $all('.subtotal');
    QUANTITY = $all('.quantity');
}

function subtotal(quantity, price, index){
    updateQuery();
    SUBTOTAL[index].textContent = (quantity * price).toFixed(2);
    updateTotal();
}

let orderTotal = 0;
function updateTotal(){
    let total = 0;
    for(let i=0;i<SUBTOTAL.length;i++){
        total += parseFloat(SUBTOTAL[i].innerHTML);
    }
    orderTotal = total;
    $('.total').innerHTML = total.toFixed(2);
}

function load(){
     //loadSampleMenu();
     loadMenu();
}

let FULL_RECEIPT = [];
let SIMPLE_RECEIPT = {};


function addOrder(form) {
    SIMPLE_RECEIPT['clientName'] = form.client.value;
    SIMPLE_RECEIPT['clientAddress'] = form.address.value;
    SIMPLE_RECEIPT['orderTotalPrice'] = orderTotal;
    console.log(SIMPLE_RECEIPT);

    for (let index in QUANTITY) {
        if (QUANTITY[index].value > 0) {
            FULL_RECEIPT.push({
                clientName: form.client.value,
                orderItemID: chosenMenu[index].weekItemID,
                orderItemQty: QUANTITY[index].value
            });
        }
    }
    console.log(FULL_RECEIPT);
    $('.popup').style.display = 'block';
}

function saveOrder(){
    let confirmOrder = confirm('Finalize order?');
    if(confirmOrder){
        let simpleURL = simpleURLConstruct();
        let orderSimple = new XMLHttpRequest();
        orderSimple.open("get", simpleURL, false);
        orderSimple.onreadystatechange = function (){
            console.log(this.readyState + " " + this.status);
            if (this.readyState == 4 && this.status == 200) {
                if (JSON.parse(this.responseText)[0].status == 200) {
                    console.log('Client added!');
                }
            }
        }
        orderSimple.send();

        FULL_RECEIPT.map(function(item){
            let fullURL = fullURLConstruct(item);
            let orderFull = new XMLHttpRequest();
            orderFull.open("get", fullURL, false);
            orderFull.onreadystatechange = function(){
                console.log(this.readyState + " " + this.status);
                if(this.readyState == 4 && this.status == 200){
                    console.log(JSON.parse(this.responseText)[0]);
                    if(JSON.parse(this.responseText)[0].status == 200){
                        console.log('Item added!');
                    }
                }
            }
            orderFull.send();
        });

        alert('Order confirmed and saved!');
        window.location.replace('/');

    }else{
        $('popup').style.display = 'none';
    }
}

function simpleURLConstruct(){
    let simpleConstruct = '/simplereceipt?';
    simpleConstruct += 'orderClient=' + SIMPLE_RECEIPT.clientName
        + '&orderAddress=' + SIMPLE_RECEIPT.clientAddress
        + '&orderTotal=' + SIMPLE_RECEIPT.orderTotalPrice;
    return simpleConstruct;
}

function fullURLConstruct(item){
    let fullConstruct = '/fullreceipt?';
    fullConstruct += 'orderClient=' + item.clientName
        + '&orderItemTag=' + item.orderItemID
        + '&orderItemQuan=' + item.orderItemQty;
    console.log(fullConstruct)
    return fullConstruct;
}

