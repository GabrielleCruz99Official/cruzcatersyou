"use strict"
/* clear previous menu and load item cache */

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

/* variables */
let pickedMenu = []; //table containing the chosen items
let btnSubmit = $('.menuSubmit'); //for modal popup

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
    $('#appetizer').innerHTML = APP;
    $('#main').innerHTML = MAIN;
    $('#dessert').innerHTML = DESSERT;
}

function confirmation() {
    stockMenu();
    $('.popup').style.display = "block";
    return false;
}

function stockMenu(){
    let submitList = $('.chosenMenu');
    let displayList = '';
    let chosenList = $all('input[type=checkbox]:checked');
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

function saveMenu(){
    let confirmMenu = confirm("Is the menu finalized?");
    if(confirmMenu){
        for(let item of pickedMenu){
            let url = setURL(item.chosenItemID);
            let save = new XMLHttpRequest();
            save.open("get", url, false);
            save.onreadystatechange = function(){
                console.log(this.readyState + " " + this.status);
                if(this.readyState == 4 & this.status == 200){
                    if(JSON.parse(this.responseText)[0] == 200){
                        console.log('Item added to this week\'s menu!');
                    }
                }
            }
            save.send();
        }
        alert('Menu is set for this week!');
        window.location.replace("/");
    }else{
        $('.popup').style.display = "none";
    }
}

function setURL(value){
    let urlBase = '/setweek?chosenItemID=' + value;
    return urlBase;
}