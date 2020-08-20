'use strict'
//sample menu chosen for the week
let chosenMenu = [
    {weekItem: 'Summer Rolls', weekItemPrice: 5},
    {weekItem: 'Crispy Fried Noodles', weekItemPrice: 12},
    {weekItem: 'Leche Flan', weekItemPrice: 6}
];

function load(){
    loadMenu();
}

function loadMenu(){
    let chosenTable = '';
    /* using the index of each item, it will help locate the item's price every time
    * the subtotal is updated
    */
    chosenMenu.map(function(menu, index){
        chosenTable += "<tr><td>" + menu.weekItem + "</td><td class='price'>"
            + menu.weekItemPrice + "€</td>"
            +"<td><input type='number' class='quantity' min='0' value='0' onchange='subtotal(this.value," + menu.weekItemPrice + "," + index +")'</td>"
            +"<td class='subtotal'>0</td></tr>"
    });
    chosenTable += "<tr><td></td><td></td><td id='totalRight'>Total:</td><td class='total'></td></tr>"
    select('#ordermenu').innerHTML = chosenTable;
}

let SUBTOTAL = select_all('.subtotal'); //table that holds all subtotal values
let QUANTITY = select_all('.quantity'); //table that holds all quantity values

/**
 * Update the subtotal and quantity arrays
 */
function updateQuery(){
    SUBTOTAL = select_all('.subtotal');
    QUANTITY = select_all('.quantity');
}

/**
 * @param quantity - item quantity
 * @param price - item price
 * @param index - item index in the table
 */
function subtotal(quantity, price, index){
    updateQuery();
    SUBTOTAL[index].textContent = (quantity * price).toFixed(2);
    updateTotal();
}

let orderTotal = 0;

/**
 * Update the subtotal of the item and the total price of the order
 * every time we add or subtract the quantity of a specific item
 */
function updateTotal(){
    let total = 0;
    for(let i=0;i<SUBTOTAL.length;i++){
        total += parseFloat(SUBTOTAL[i].innerHTML);
    }
    orderTotal = total;
    select('.total').innerHTML = total.toFixed(2);
}

let FULL_RECEIPT = [];
let SIMPLE_RECEIPT = {};

/**
 * @param form - the order receipt
 * Creates a simple and comprehensive receipt of the order
 */
function addOrder(form) {

    /*add to simple receipt*/
    SIMPLE_RECEIPT['clientName'] = form.client.value;
    SIMPLE_RECEIPT['clientAddress'] = form.address.value;
    SIMPLE_RECEIPT['orderTotalPrice'] = orderTotal;
    console.log(SIMPLE_RECEIPT);

    /*add to comprehensive receipt*/
    for (let index in QUANTITY) {
        if (QUANTITY[index].value > 0) {
            FULL_RECEIPT.push({
                clientName: form.client.value,
                orderItem: chosenMenu[index].weekItem,
                orderItemQty: QUANTITY[index].value
            });
        }
    }
    console.log(FULL_RECEIPT);

    displayReceipt();

    /*display pop-up*/
    select('.popup').style.display = 'block';
    let closeButton = select('.close');
    closeButton.onclick = function() {
        select('.popup').style.display = "none";
    }
    return false;
}

/*
*   Display order details on a pop-up
*/
function displayReceipt(){
    let display = '';
    display += '<li>Client Name: ' + SIMPLE_RECEIPT.clientName + '</li>';
    for(let item of FULL_RECEIPT){
       display += '<li>' + item.orderItem + ' - ' + item.orderItemQty + '</li>';
    }
    display += '<li>Order Total: ' + SIMPLE_RECEIPT.orderTotalPrice + '€</li>';
    select('.displayOrder').innerHTML = display;
}

/**
 * Confirm the client's order
 */
async function saveOrder(){
    let confirmOrder = confirm('Finalize order?');
    if(confirmOrder){
        alert('Order registered!');
        window.location.replace('./index.html');
    }else{
        select('.popup').style.display = 'none';
    }
}





