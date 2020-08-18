"use strict"
/* clear previous menu and load item cache */

let clearMenu = new XMLHttpRequest();
clearMenu.open("get", "/clearmenu", true);
clearMenu.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        if(JSON.parse(this.responseText)[0].status == 200){
            console.log("Menu cleared!");
        }
    }
};
clearMenu.send();

let clearOrders = new XMLHttpRequest();
clearOrders.open("get", "/clearorders", true);
clearOrders.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        if(JSON.parse(this.responseText)[0].status == 200){
            console.log("Orders cleared!");
        }
    }
}
clearOrders.send();

let menu = [];
let menuList = new XMLHttpRequest();
menuList.open("get", "/weekmenu", true);
menuList.onload = function(){
    menu = JSON.parse(menuList.responseText);
};
menuList.send();


/* variables */
let pickedMenu = []; //table containing the chosen items
let btnSubmit = select('.menuSubmit'); //for modal popup

/* functions */

function load(){
    loadMenuList();
}

function loadMenuList() {
    let APP = '';
    let MAIN = '';
    let DESSERT = '';
    for (let id in menu) {
        if(menu[id].itemCourse == 'Appetizer'){
            APP += "<input type='checkbox' class='menu' value='"
                + menu[id].itemName + "'>"
                + menu[id].itemName + " : "
                + menu[id].itemPrice + "€ <br>";
        }else if(menu[id].itemCourse == 'Main') {
            MAIN += "<input type='checkbox' class='menu' value='"
                + menu[id].itemName + "'>"
                + menu[id].itemName + " : "
                + menu[id].itemPrice + "€ <br>";
        }else if(menu[id].itemCourse == 'Dessert') {
            DESSERT += "<input type='checkbox' class='menu' value='"
                + menu[id].itemName + "'>"
                + menu[id].itemName + " : "
                + menu[id].itemPrice + "€ <br>";
        }else{
            console.log('Error!');
        }
    }
    select('#appetizer').innerHTML = APP;
    select('#main').innerHTML = MAIN;
    select('#dessert').innerHTML = DESSERT;
}

/**
 * Mettre un pop-up avec les plats choisi pour le menu de la semaine
 */
function confirmation() {
    stockMenu();
    select('.popup').style.display = "block";
    let closeButton = select('.close');
    closeButton.onclick = function() {
        select('.popup').style.display = "none";
    }
    return false;
}

/**
 * Stocker les plats choisi en array
 */
function stockMenu(){
    let submitList = select('.chosenMenu');
    let displayList = '';
    let chosenList = select_all('input[type=checkbox]:checked');
    for (let chosen of chosenList) {
        for (let id in menu) {
            if (chosen.value == menu[id].itemName) {
                pickedMenu.push({
                    chosenItemID: menu[id].itemID,
                    chosenItem: menu[id].itemName,
                    chosenItemPrice: menu[id].itemPrice
                });
                displayList += "<li>" + menu[id].itemName + "</li>";
            }
        }
    }
    submitList.innerHTML = displayList;
    console.log(pickedMenu);
}

/**
 * sauvegarde le menu choisi pour la semaine en base des données
 */
function saveMenu(){
    let confirmMenu = confirm("Is the menu finalized?");
    if(confirmMenu){
        let async_test = [];
        let ajax_response = [];
        for(let item of pickedMenu){
            async_test.push($.ajax({
                url: '/setweek',
                method: 'get',
                data:{chosenItemID: item.chosenItemID},
                success: function(data){
                    console.log('Item added to this week\'s menu!');
                    ajax_response.push(data);
                }
            }));
        }

        $.when.apply(null, async_test).done(function(){
            alert('Menu is set for this week!');
            window.location.replace("/");
        });

    } else {
        $('.popup').style.display = "none";
    }
}