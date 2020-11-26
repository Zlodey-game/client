function genMonster(){
    var ghostUnit = {
        
    };
    setUnitSize(ghostUnit, 0.093, 0.166, 2.5);
    
    var min = Math.ceil (canvas.width * 0.05);
    var max = Math.floor(canvas.width * 0.95 - ghostUnit.width);
    var randX = Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함

    var min = Math.ceil (canvas.height * 0.05);
    var max = Math.floor(canvas.height - ghostUnit.height - invenBox.height);
    var randY = Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함

    ghostUnit.x = randX;
    ghostUnit.y = randY;
    ghostUnit.maxHp = 100;
    ghostUnit.hp = 100;

    monsters.push(ghostUnit);
}

function setUnitSize(unit, wd, hd, speed){
    unit.width = canvas.width*wd;
    unit.height = canvas.height*hd;
        //width: 120,
        //height: 160,
    unit.oX_speed = canvas.width*0.0008*speed;
    unit.oY_speed = canvas.height*0.0014*speed;

    if(unit.x == undefined){
        unit.x = canvas.width / 2 - unit.width / 2;
        unit.y = canvas.height / 2 - unit.height / 2;
    }
    else{
        unit.x = unit.x * (canvas.width / canvasOldWidth);
        unit.y = unit.y * (canvas.height / canvasOldHeight);
    }
}

function setUnitAngle(unit, x, y){
    unit.agl = Math.atan2(x - (unit.x + unit.width/2) , (unit.y + unit.height/2) - y) * 180 / Math.PI;
}

function setPlayerStatus(unit, mode){
    if(mode == 'speed'){
        unit.X_speed = unit.oX_speed + unit.oX_speed * (unit.agi * 0.01);
        unit.Y_speed = unit.oY_speed + unit.oY_speed * (unit.agi * 0.01);
    }
    else{
        if(inventory[9].id != null) unit.atk = 1 + itemInfo[inventory[9].id-1].atk;
        if(inventory[10].id != null) unit.def = 1 + itemInfo[inventory[10].id-1].def;
        if(inventory[11].id != null) unit.maxHp = 1 + itemInfo[inventory[11].id-1].hp;
        if(inventory[12].id != null) unit.agi = 1 + itemInfo[inventory[12].id-1].agi;
    }
}

function attack(){
    var p  = playerUnit;
    var allowDeg = 15;

    //console.log('clicked');
    //monsters.pop()
    //console.log(monsters);
    for(let i=0; i<monsters.length; i++){
        let unit = monsters[i];

        let agl = Math.atan2((unit.x + unit.width/2) - (p.x + p.width/2), (p.y + p.height/2) - (unit.y + unit.height/2)) * 180 / Math.PI;
        let len = Math.hypot((p.y + p.height/2) - (unit.y + unit.height/2), (unit.x + unit.width/2) - (p.x + p.width/2));


        if(p.agl - allowDeg < agl && p.agl + allowDeg > agl && len < p.width * 2.0){
            //console.log('Attaked!');                 
            unit.hp -= p.atk;
            if(unit.hp <= 0){
                //console.log('Dead!');                 
                if (i > -1) monsters.splice(i, 1)
                playerUnit.exp += 2;
                dropItem(unit.x, unit.y);
            }
        }
    }
}

function dropItem(x, y){
    let min = Math.ceil(2);
    let max = Math.floor(14);
    
    let itemNum = Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함

    //console.log(x, y, itemNum);
    let item = {
        itemId : itemNum,
        x : x,
        y : y,
        len : canvas.width * 0.07
    }
    droppedItems.push(item);
}