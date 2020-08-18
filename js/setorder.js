'use strict'
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
    select('#ordermenu').innerHTML = chosenTable;
}

let SUBTOTAL = select_all('.subtotal');
let QUANTITY = select_all('.quantity');

/**
 * Mettre à jour les caches de quantité et sous-total
 */
function updateQuery(){
    SUBTOTAL = select_all('.subtotal');
    QUANTITY = select_all('.quantity');
}

/**
 * @param quantity - quantité du plat
 * @param price - prix du plat
 * @param index - la position du plat dans le tableau
 */
function subtotal(quantity, price, index){
    updateQuery();
    SUBTOTAL[index].textContent = (quantity * price).toFixed(2);
    updateTotal();
}

let orderTotal = 0;

/**
 * Mettre à jour le sous-total à chaque fois qu'on
 * augmente ou diminue la quantité d'un plat
 */
function updateTotal(){
    let total = 0;
    for(let i=0;i<SUBTOTAL.length;i++){
        total += parseFloat(SUBTOTAL[i].innerHTML);
    }
    orderTotal = total;
    select('.total').innerHTML = total.toFixed(2);
}

function load(){
     loadMenu();
}

let FULL_RECEIPT = [];
let SIMPLE_RECEIPT = {};

/**
 * @param form - le billet complet
 * Séparer le billet complet en deux sous-billets
 */
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
    select('.popup').style.display = 'block';
}

/**
 * Sauvegarde le billet en deux tableaux: un billet simple avec le nom du client,
 * leur adrèsse, et le coût total; et un billet compréhensive avec la quantité
 * de chaque plat et leur sous-totale
 * @returns {Promise<void>} status
 */
async function saveOrder(){
    let confirmOrder = confirm('Finalize order?');
    if(confirmOrder){
        let simple_save = $.ajax({
            url: "/simplereceipt",
            method: 'get',
            data:{orderClient: SIMPLE_RECEIPT.clientName, orderAddress: SIMPLE_RECEIPT.clientAddress, orderTotal: SIMPLE_RECEIPT.orderTotalPrice},
            success: function(){
                console.log('Client added!');
            }
        });
        $.when.apply(null, simple_save).done(function(){
            alert('Order registered!');
        });
        let receipt_status = 0;
        for(let item of FULL_RECEIPT){
            let item_request = await fetch(`/fullreceipt?orderClient=${item.clientName}&orderItemTag=${item.orderItemID}&orderItemQuan=${item.orderItemQty}`);
            console.log(item_request);
            let [{status}] = await item_request.json();
            console.log(status);
            receipt_status = status;
        }
        if(receipt_status != 200) alert('Error!');
        else window.location.replace('/');
    }else{
        select('.popup').style.display = 'none';
    }
}





