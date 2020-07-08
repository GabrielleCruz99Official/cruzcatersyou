"use strict"

let sampleMenu = {
    ENT01 : {Name: "Kare-Kare", Type: "Entree", Price: 10, Selected: false},
    ENT02 : {Name: "Beef Caldereta", Type: "Entree" , Price: 12, Selected: false},
    DES01 : {Name: "Mini Cheesecake", Type: "Dessert", Price: 6, Selected: false}
};

let pickedMenu = {};

function loadSample(){
    let sampleTable = '';
    sampleTable += "<thead><tr><th>Item</th><th>Price</th></tr></thead><tbody>";
    for(let item of Object.keys(sampleMenu)){
        sampleTable += "<tr><td>" + sampleMenu[item].Name + "</td><td>" + sampleMenu[item].Price
            + "€</td><td><input type='checkbox' onselect='switchState(\'" + item + "\')' </td></tr>";
    }
    sampleTable += "</tbody>";
    gid('menuchoices').innerHTML = sampleTable;
}

function loadSetMenu() {
    loadSample();
    /* loadSampleTable();
    loadPickedTable();
     */
}

function switchState(code){
    if(sampleMenu[code].Selected == false){
        sampleMenu[code].Selected = true;
        pickedMenu[code] = sampleMenu[code];
    } else {
        sampleMenu[code].Selected = false;
        delete pickedMenu[code];
    }
    loadPickedMenu();
}

function addItem(code){
    pickedMenu.code = sampleMenu.code;
    delete sampleMenu.code;
    loadSetMenu();
    loadPickedMenu();
}

function loadPickedMenu(){
    let pickedTable = '';
    pickedTable += "<thead><tr><th>Item</th><th>Price</th></tr></thead><tbody>";
    for(let item of Object.keys(pickedMenu)){
        pickedTable += "<tr><td>" + pickedMenu[item].Name + "</td><td>" + pickedMenu[item].Price
            + "€</td></tr>";
    }
    pickedTable += "</tbody>";
    gid('menupicked').innerHTML = pickedTable;
}

function removeItem(code){
    sampleMenu.code = pickedMenu.code;
    delete pickedMenu.code;
    loadSetMenu();
    loadPickedMenu();
}
