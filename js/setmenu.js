"use strict"

/* event listeners */
const pageLoad = document.addEventListener('load', loadMenuList);

/* Load Menu Cache and Clear Previously Set Table */
let menu = [];
let menuList = new XMLHttpRequest();
menuList.open("get", "/weekmenu", true);
menuList.onload = function(){
    menu = JSON.parse(menuList.responseText);
};
menuList.send();

let clear = new XMLHttpRequest();
clear.open("get", "/clearmenu", true);
clear.onload = function(){
    console.log(JSON.parse(this.responseText));
    if(JSON.parse(clear.responseText)[0].status == 200){
        console.log("Menu cleared!");
    }
};
clear.send();

/* Load Cache onto Webpage */
function loadMenuList() {
    let APP = '';
    let MAIN = '';
    let DESSERT = '';
    for (let id in menu) {
        if(menu[id].itemCourse == 'Appetizer'){
            APP += "<input type='checkbox' class='menu' value='"
                + menu[id].itemID + "'>"
                + menu[id].itemName + " : "
                + menu[id].itemPrice + "€ <br>";
        }else if(menu[id].itemCourse == 'Main') {
            MAIN += "<input type='checkbox' class='menu' value='"
                + menu[id].itemID + "'>"
                + menu[id].itemName + " : "
                + menu[id].itemPrice + "€ <br>";
        }else if(menu[id].itemCourse == 'Dessert') {
            DESSERT += "<input type='checkbox' class='menu' value='"
                + menu[id].itemID + "'>"
                + menu[id].itemName + " : "
                + menu[id].itemPrice + "€ <br>";
        }else{
            console.log('Error!');
        }
    }
    $('#appetizer').innerHTML = APP;
    $('#main').innerHTML = MAIN;
    $('#dessert').innerHTML = DESSERT;
}

let pickedMenu = []; //Array containing the chosen items for this week's menu; to be submitted later

/* save menu for the week */
function saveMenu(){
    alert("This week's menu has been set!");
    window.location.replace("/");
}

function load(){
    loadMenuList();
}