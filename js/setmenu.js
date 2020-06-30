"use strict"

let testMenu = ["Kare-Kare", "Beef Caldereta", "Five-Spice Chicken"];
function testItem(){
    let addTable = '';
    addTable += "<thead><tr><th>Item</th><th>Add?</th></tr></thead><tbody>"
    for(let item of testMenu){
        addTable += "<tr><td>" + item + "</td><td><button onclick='addItem()'>Add</button></td></tr>";
    }
    addTable += "</tbody>";
    gid('menuchoices').innerHTML = addTable;
}