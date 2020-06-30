"use strict"

let sampleMenu = {
    'Kare-Kare': 10,
    'Beef Caldereta': 12,
    'Cheesecake': 6
};
function loadSample(){
    let addTable = '';
    addTable += "<thead><tr><th>Item</th><th>Price</th><th>Add?</th></tr></thead><tbody>";
    for(let item of Object.keys(sampleMenu)){
        addTable += "<tr><td>" + item + "</td><td>" + sampleMenu[item]
            + "€</td><td><button onclick='addItem()'>Add</button></td></tr>";
    }
    addTable += "</tbody>";
    gid('menuchoices').innerHTML = addTable;
}

function loadSetMenu(){
    loadSample();
}

function addItem(item){
    let addChoice = '';

    addChoice += "<thead><tr><th>Item</th><th>Remove?</th></tr></thead><tbody>";
    addChoice += "<tr id=" + item + "><td>" + item + "</td><td><button onclick='removeItem(item)'>Add</button></td></tr>";
    addChoice += "</tbody>";
    gid('menupicked').innerHTML = addChoice;
}

function removeItem(){

}