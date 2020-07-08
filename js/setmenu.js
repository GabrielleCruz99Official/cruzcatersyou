"use strict"

let sampleMenu = {
    ENT01 : {name: "Kare-Kare", course: "Main", price: 10},
    ENT02 : {name: "Beef Caldereta", course: "Main" , price: 12},
    DES01 : {name: "Mini Cheesecake", course: "Dessert", price: 6}
};

let pickedMenu = {};

function loadSample() {
    let SAMPLE_APP = '';
    let SAMPLE_MAIN = '';
    let SAMPLE_DESSERT = '';
    let SAMPLEMENU_ID = Object.keys(sampleMenu);
    for (let id of SAMPLEMENU_ID) {
        if (sampleMenu[id].course == 'Appetizer'){
            SAMPLE_APP += "<input type='checkbox' value='"
                + sampleMenu[id].name + "'>"
                + sampleMenu[id].name + " : "
                + sampleMenu[id].price + "€ <br>";
        }else if(sampleMenu[id].course == 'Main') {
            SAMPLE_MAIN += "<input type='checkbox' value='"
                + sampleMenu[id].name + "'>"
                + sampleMenu[id].name + " : "
                + sampleMenu[id].price + "€ <br>";
        }else if(sampleMenu[id].course == 'Dessert') {
            SAMPLE_DESSERT += "<input type='checkbox' value='"
                + sampleMenu[id].name + "'>"
                + sampleMenu[id].name + " : "
                + sampleMenu[id].price + "€ <br>";
        }else{
            console.log('Error!');
        }

    }
    gid('appetizer').innerHTML = SAMPLE_APP;
    gid('main').innerHTML = SAMPLE_MAIN;
    gid('dessert').innerHTML = SAMPLE_DESSERT;
}
