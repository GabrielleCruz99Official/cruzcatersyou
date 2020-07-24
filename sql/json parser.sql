let url = seturl(object);
    let setWeekMenu = new XMLHttpRequest();
    setWeekMenu.open("get", url, true);
    setWeekMenu.onreadystatechange = function(){
        console.log(this.readyState + " " + this.status);
    }
    setWeekMenu.onload = function(){
        console.log(JSON.parse(this.responseText));
        if(JSON.parse(setWeekMenu.responseText)[0].status == 200){
            console.log("Added!");
        }
    };
    setWeekMenu.send();
	
	
function saveMenu(){
    let CHOSEN_MENU = $all('input[type=checkbox]:checked');
    for(let chosen of CHOSEN_MENU){
        for(let id in menu){
            if(chosen.value == menu[id].itemName){
                pickedMenu.push({chosenItemID: menu[id].itemID, chosenItem: menu[id].itemName, chosenItemPrice: menu[id].itemPrice});
            }
        }
    }
    console.log(pickedMenu);

    alert("This week's menu is set!");
    window.location.replace("/");
}

function seturl(object){
    let urlbase = "/setweek?";
    urlbase += "chosenItemID=" + object['chosenItemID'];
    console.log(urlbase);
    return urlbase;
}
