"use strict"

/*
let sampleMenu = {
    ENT01 : {name: "Kare-Kare", course: "Main", price: 10},
    ENT02 : {name: "Beef Caldereta", course: "Main" , price: 12},
    DES01 : {name: "Mini Cheesecake", course: "Dessert", price: 6}
};

function loadSample() {
    let SAMPLE_APP = '';
    let SAMPLE_MAIN = '';
    let SAMPLE_DESSERT = '';
    let SAMPLEMENU_ID = Object.keys(sampleMenu);
    for (let id of SAMPLEMENU_ID) {
        if (sampleMenu[id].course == 'Appetizer'){
            SAMPLE_APP += "<input type='checkbox' class='menu' value='"
                + sampleMenu[id].name + "'>"
                + sampleMenu[id].name + " : "
                + sampleMenu[id].price + "€ <br>";
        }else if(sampleMenu[id].course == 'Main') {
            SAMPLE_MAIN += "<input type='checkbox' class='menu' value='"
                + sampleMenu[id].name + "'>"
                + sampleMenu[id].name + " : "
                + sampleMenu[id].price + "€ <br>";
        }else if(sampleMenu[id].course == 'Dessert') {
            SAMPLE_DESSERT += "<input type='checkbox' class='menu' value='"
                + sampleMenu[id].name + "'>"
                + sampleMenu[id].name + " : "
                + sampleMenu[id].price + "€ <br>";
        }else{
            console.log('Error!');
        }

    }
    $('#appetizer').innerHTML = SAMPLE_APP;
    $('#main').innerHTML = SAMPLE_MAIN;
    $('#dessert').innerHTML = SAMPLE_DESSERT;
}
*/

let menu = [];
let menuList = new XMLHttpRequest();
menuList.open("get", "/weekmenu", true);
menuList.onload = function(){
    menu = JSON.parse(menuList.responseText);
};
menuList.send();

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

let pickedMenu = [];

function saveMenu(){
    let CHOSEN_MENU = $all('input[type=checkbox]:checked');
    for(let chosen of CHOSEN_MENU){
        for(let id in menu){
            if(chosen.value == menu[id].itemName){
                pickedMenu.push({weekItemID: menu[id].itemID, weekItem: menu[id].itemName, weekItemPrice: menu[id].itemPrice});
            }
        }
    }
    console.log(pickedMenu);
    clearmenu();
    for(let item of pickedMenu){
        setmenu(item);
    }
    alert("This week's menu is set!");
    window.location.replace("/");
}

function clearmenu(){
    let clear = new XMLHttpRequest();
    clear.onreadystatechange = function() {
        if(this.statechange == 4 && this.status == 200){
            console.log(this.responseText);
        }
    };
    clear.open("get", "/clearmenu", true);
    clear.send();
}

function setmenu(object){
    let url = seturl(object);
    let setWeekMenu = new XMLHttpRequest();
    setWeekMenu.onreadystatechange = function() {
        if(this.statechange == 4 && this.status == 200){
            console.log(this.responseText);
        }
    };
    setWeekMenu.open("get", url, true);
    setWeekMenu.send();
}

function seturl(object){
    let urlbase = "/setweek?";
    urlbase += "weekItemID=" + object['weekItemID'];
    urlbase += "&weekItem=" + object['weekItem'];
    urlbase += "&weekItemPrice" + object['weekItemPrice'];
    return urlbase;
}

