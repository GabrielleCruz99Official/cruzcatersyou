"use strict"
/* clear previous menu and load item cache */

/* sample menu */
let menu = [
    {itemName: 'Summer Rolls', itemCourse: 'Appetizer', itemPrice: 5},
    {itemName: 'Spring Rolls', itemCourse: 'Appetizer', itemPrice: 10},
    {itemName: 'Crispy Fried Noodles', itemCourse: 'Main', itemPrice: 12},
    {itemName: 'Kare-Kare', itemCourse: 'Main', itemPrice: 10},
    {itemName: 'Mini Cheesecake', itemCourse: 'Dessert', itemPrice: 6},
    {itemName: 'Leche Flan', itemCourse: 'Dessert', itemPrice: 6}
];

/* variables */
let pickedMenu = []; //table containing the chosen items
let btnSubmit = select('.menuSubmit'); //for modal popup

/* functions */
function load(){
    loadMenuList();
}

/**
 * From the menu (or sample menu, in this case), we will separate the items
 * based on their menu course
 */
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
 * Display popup with the chosen items for the week's menu
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
 * Save the items in a new array
 */
function stockMenu(){
    let submitList = select('.chosenMenu');
    let displayList = ''; //display for the pop-up
    let chosenList = select_all('input[type=checkbox]:checked'); //select all items that were checked
    for (let chosen of chosenList) {
        for (let id in menu) {
            if (chosen.value == menu[id].itemName) {
                pickedMenu.push({
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
        alert('Menu is set for this week!');
        window.location.replace('./index.html');
    } else {
        $('.popup').style.display = "none";
    }
}