document.addEventListener("mousemove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    
    setUnitAngle(playerUnit, pointer.x, pointer.y);
}, false);

document.addEventListener("click", (e)=>{
    if(getMouseWhich(e.clientX, e.clientY) == 'game') attack();
}, false);

document.addEventListener("mousedown", (e)=>{
    which = getMouseWhich(e.clientX, e.clientY);
    if(which != 'game') moveInven(which, e.clientX, e.clientY, 'down');
}, false);

document.addEventListener("mouseup", (e)=>{
    which = getMouseWhich(e.clientX, e.clientY);
    if(inventory.findIndex(obj=>obj.clicked == true) != -1)
        moveInven(which, e.clientX, e.clientY, 'up');
}, false);

function getKeyDown(event){
    var keyValue;
    if(event == null) return;
    else {
        keyValue=event.keyCode;
        event.preventDefault();
    }
    if(keyValue == "87") keyValue = "38";       //up
    else if(keyValue == "83") keyValue = "40";  //down
    else if(keyValue == "65") keyValue = "37";  //left
    else if(keyValue == "68") keyValue = "39";  //right
    keyPressOn[keyValue] = true;
}

function getKeyUp(event){
    var keyValue;
    if(event == null){
        keyValue = window.event.keyCode;
        window.event.preventDefault();
    }
    else{
        keyValue=event.keyCode;
        event.preventDefault();
    }
    if(keyValue == "87") keyValue = "38";       //up
    else if(keyValue == "83") keyValue = "40";  //down
    else if(keyValue == "65") keyValue = "37";  //left
    else if(keyValue == "68") keyValue = "39";  //right
    
    keyPressOn[keyValue] = false;
}

function moveInven(which, x, y, flg){
    let invBox = {
        dy : canvas.height - mainBox.height + mainBox.height * 0.47 - inven.len,
        uy : canvas.height - mainBox.height + mainBox.height * 0.47,
        base : (canvas.width - mainBox.width) / 2 + (mainBox.width - inven.len)/2,
        x_base : (inven.len*1.2 + inven.lineWidth)
    };
    let sloBox = {
        dy : canvas.height - invenBox.height + invenBox.height * 0.4 - inven.len,
        uy : canvas.height - invenBox.height + invenBox.height * 0.4,
        base : base = (canvas.width - invenBox.width) + (invenBox.width - inven.len)/2,
        x_base : (inven.len*1.6 + inven.lineWidth)
    };
    let idx;

    if(flg == 'down'){
        //console.log(which);
        for(let i=0; i<13; i++){
            inventory[i].clicked = false;
        }
        if(which == 'inven'){
            //console.log(y, invBox.dy, invBox.uy);
            if(invBox.dy <= y && invBox.uy >= y){
                for(idx=0; idx<9; idx++){
                    invBox.dx = invBox.base + invBox.x_base * (idx-4);
                    invBox.ux = invBox.base + invBox.x_base * (idx-4) + inven.len;
                    //console.log(x, invBox.dx, invBox.ux);
                    if(invBox.dx < x && invBox.ux > x){
                        //console.log(idx);
                        break;
                    }
                }
                inventory[idx].clicked = true;                
            } 
        }
        else if(which == 'slot'){                
            //console.log(y, sloBox.dy, sloBox.uy);
            if(sloBox.dy <= y && sloBox.uy >= y){
                for(idx=0; idx<4; idx++){
                    sloBox.dx = sloBox.base + sloBox.x_base * (idx-1.5);
                    sloBox.ux = sloBox.base + sloBox.x_base * (idx-1.5) + inven.len;
                    //console.log(x, box.dx, box.ux);
                    if(sloBox.dx < x && sloBox.ux > x){
                        //console.log(idx);
                        break;
                    }
                }
                inventory[idx+9].clicked = true;                
            } 
        }
    }

    else if(flg == 'up'){
        //console.log(which);
        const origin = inventory.findIndex(obj=>obj.clicked==true);

        if(which == 'inven'){
            //console.log(y, invBox.dy, invBox.uy);
            if(invBox.dy <= y && invBox.uy >= y){
                for(idx=0; idx<9; idx++){
                    invBox.dx = invBox.base + invBox.x_base * (idx-4);
                    invBox.ux = invBox.base + invBox.x_base * (idx-4) + inven.len;
                    //console.log(x, invBox.dx, invBox.ux);
                    if(invBox.dx < x && invBox.ux > x){
                        //console.log(idx);
                        break;
                    }
                }

                if(idx == 9){
                    inventory[origin].clicked = false;
                }
                else{
                    //console.log(idx);
                    var temp = inventory[origin];
                    inventory[origin] = inventory[idx];
                    inventory[idx] = temp;
                    //console.log(inventory[idx], inventory[origin]);
                    inventory[idx].clicked = false;
                }
            } 
            else{
                inventory[origin].clicked = false;
            }
        }
        else if(which == 'slot'){
            //console.log(y, sloBox.dy, sloBox.uy);
            if(sloBox.dy <= y && sloBox.uy >= y){
                for(idx=0; idx<4; idx++){
                    sloBox.dx = sloBox.base + sloBox.x_base * (idx-1.5);
                    sloBox.ux = sloBox.base + sloBox.x_base * (idx-1.5) + inven.len;
                    //console.log(x, box.dx, box.ux);
                    if(sloBox.dx < x && sloBox.ux > x){
                        //console.log(idx);
                        break;
                    }
                }

                if(idx == 4){
                    inventory[origin].clicked = false;
                }
                else{
                    idx += 9;
                    //console.log(idx);
                    var temp = inventory[origin];
                    inventory[origin] = inventory[idx];
                    inventory[idx] = temp;
                    //console.log(inventory[idx], inventory[origin]);
                    inventory[idx].clicked = false;
                }
            } 
            else{
                inventory[origin].clicked = false;
            }
        }
        else{
            inventory[origin].clicked = false;
        }
    }
}

function checkGetItem(unit, item, idx){
    if(unit.x < item.x + item.len * 0.5 && unit.x + unit.width > item.x + item.len * 0.5 && 
       unit.y < item.y + item.len * 0.5 && unit.y + unit.height > item.y + item.len * 0.5){
        var emptyIdx = inventory.findIndex(obj=>obj.id == undefined);
        if(emptyIdx < 9){
            inventory[emptyIdx].id = item.itemId;
            droppedItems.splice(idx, 1);
        }
    }
}