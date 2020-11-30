itemInfo = [
    {
        type : 'weapon',
        atk : 10
    },{
        type : 'weapon',
        atk : 20
    },{
        type : 'weapon',
        atk : 30
    },{
        type : 'weapon',
        atk : 40
    },{
        type : 'armor',
        def : 10
    },{
        type : 'armor',
        def : 20
    },{
        type : 'armor',
        def : 30
    },{
        type : 'armor',
        def : 40
    },{
        type : 'shoes',
        agi : 10
    },{
        type : 'shoes',
        agi : 20
    },{
        type : 'shoes',
        agi : 30
    },{
        type : 'shoes',
        agi : 40
    },{
        type : 'pants',
        hp : 10
    },{
        type : 'pants',
        hp : 20
    },{
        type : 'pants',
        hp : 30
    }, {
        type : 'pants',
        hp : 40
    }
];

function genMonster(){
    //console.log(isPause);
    if(!isPause){
        var ghostUnit = {
            
        };
        setUnitSize(ghostUnit, 0.093, 0.166, 2.5);
        
        var min = Math.ceil (canvas.width * 0.05);
        var max = Math.floor(canvas.width * 0.95 - ghostUnit.width);
        var randX = Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함

        var min = Math.ceil (canvas.height * 0.05);
        var max = Math.floor(canvas.height - ghostUnit.height - invenBox.height);
        var randY = Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함

        var min = Math.ceil (1);
        var max = Math.floor(30);
        var randAtk = Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
        var randmaxHp = Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함

        ghostUnit.x = randX;
        ghostUnit.y = randY;
        ghostUnit.atk = randAtk;
        ghostUnit.maxHp = randmaxHp;
        ghostUnit.hp = randmaxHp;
        ghostUnit.moveCooltime = 10;
        ghostUnit.moveStatus = 'none'
        //ghostUnit.moving = false;
        ghostUnit.oldAgl = 0;
        //ghostUnit.attacking = false;

        monsters.push(ghostUnit);
    }
}

function initPlayer(unit){
    unit.x = canvas.width / 2 - 18;
    unit.y = canvas.height / 2 - 18;
    unit.agl = 0;

    unit.atk = 1;
    unit.def = 0;
    unit.maxHp = 30;
    unit.agi = 0;
    unit.lv = 1;
    unit.exp = 0;
    unit.stat = 2;

    unit.hp = 30;
    unit.mp = 0;
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
    if(!isPause){
        unit.agl = Math.atan2(x - (unit.x + unit.width/2) , (unit.y + unit.height/2) - y) * 180 / Math.PI;
    }
}

function setPlayerStatus(unit, mode, origin){
    if(mode == 'speed'){
        unit.X_speed = unit.oX_speed + unit.oX_speed * (unit.agi * 0.01);
        unit.Y_speed = unit.oY_speed + unit.oY_speed * (unit.agi * 0.01);
    }
    else if(mode == 'health'){
        unit.hp = origin;
    }
    else{
        if(inventory[origin].id != undefined){
            if(mode == 9)
                unit.atk -= itemInfo[inventory[origin].id-1].atk;
            else if(mode == 10)
                unit.def -= itemInfo[inventory[origin].id-1].def;
            else if(mode == 11)
                unit.maxHp -= itemInfo[inventory[origin].id-1].hp;
            else if(mode == 12)
                unit.agi -= itemInfo[inventory[origin].id-1].agi;
            else if(mode == null){
                if(origin == 9) unit.atk -= itemInfo[inventory[origin].id-1].atk;
                else if(origin == 10) unit.def -= itemInfo[inventory[origin].id-1].def;
                else if(origin == 11) unit.maxhp -= itemInfo[inventory[origin].id-1].hp;
                else if(origin == 12) unit.agi -= itemInfo[inventory[origin].id-1].agi;
            }
        }
        if(mode != null && inventory[mode].id != undefined){
            if(mode == 9) unit.atk += itemInfo[inventory[9].id-1].atk;
            else if(mode == 10) unit.def += itemInfo[inventory[10].id-1].def;
            else if(mode == 11) unit.maxHp += itemInfo[inventory[11].id-1].hp;
            else if(mode == 12) unit.agi += itemInfo[inventory[12].id-1].agi;
            else{
                if(itemInfo[inventory[mode].id-1].type == 'weapon') unit.atk -= itemInfo[inventory[mode].id-1].atk;
                else if(itemInfo[inventory[mode].id-1].type == 'armor') unit.def -= itemInfo[inventory[mode].id-1].def;
                else if(itemInfo[inventory[mode].id-1].type == 'pants') unit.maxHp -= itemInfo[inventory[mode].id-1].maxHp;
                else if(itemInfo[inventory[mode].id-1].type == 'shoes') unit.agi -= itemInfo[inventory[mode].id-1].agi;
            }
        }
    }
}

function attack(){
    var p  = playerUnit;
    var allowDeg = 15;

    //console.log('clicked');
    //monsters.pop()
    //console.log(monsters);
    if(isPause) return;

    for(let i=0; i<monsters.length; i++){
        let unit = monsters[i];

        let agl = Math.atan2((unit.x + unit.width/2) - (p.x + p.width/2), (p.y + p.height/2) - (unit.y + unit.height/2)) * 180 / Math.PI;
        let len = Math.hypot((p.y + p.height/2) - (unit.y + unit.height/2), (unit.x + unit.width/2) - (p.x + p.width/2));


        if(p.agl - allowDeg < agl && p.agl + allowDeg > agl && len < p.width * 2.5){
            unit.moveStatus = 'attack';
            //unit.attacked = true;
            // unit.x += Math.sin(playerUnit.agl*0.017453) * unit.oX_speed * 3;
            // unit.y -= Math.cos(playerUnit.agl*0.017453) * unit.oY_speed * 3;
            //console.log('Attaked!');                 
            unit.hp -= p.atk;
            if(unit.hp <= 0){
                //console.log('Dead!');                 
                playerUnit.exp += parseInt(unit.atk*0.3)+1;
                if(playerUnit.exp > playerUnit.lv*20){
                    playerUnit.exp = 0;
                    playerUnit.lv++;
                    playerUnit.hp = playerUnit.maxHp;
                    playerUnit.stat += 3;
                }
                dropItem(unit.x, unit.y);

                if (i > -1) monsters.splice(i, 1)
                
            }
        }
    }
}

function moveMonster(){
    for(m of monsters){
        if(m.moveStatus == 'none'){
            if(--m.moveCooltime <= 0){
                m.moveStatus = 'moving';
                m.moveCooltime = 15;
            } 
        }
        if(m.moveStatus == 'attack'){
            m.moveCooltime = 1;
            m.moveStatus = 'attacked';
            m.oldAgl = playerUnit.agl;
        }
        if(m.moveStatus == 'attacked'){
            if(--m.moveCooltime < 0){
                m.moveStatus = 'none';
                m.moveCooltime = 5;
            }
            else{
                m.x += Math.sin(m.oldAgl*0.017453) * (m.oX_speed * 1);
                m.y -= Math.cos(m.oldAgl*0.017453) * (m.oY_speed * 1); 
            }
        }
        if(m.moveStatus == 'moving'){
            if(--m.moveCooltime < 0){
                m.moveStatus = 'none';
                m.moveCooltime = 100;
            }
            else{
                const agl = Math.atan2(playerUnit.x - m.x, m.y - playerUnit.y ) * 180 / Math.PI;
                //console.log(agl);
                m.x += Math.sin(agl*0.017453) * m.oX_speed;
                m.y -= Math.cos(agl*0.017453) * m.oY_speed;
            }
        }
    }
}

function damageMonster(){
    const p = {
        xd : playerUnit.x,
        xu : playerUnit.x + playerUnit.width,
        yd : playerUnit.y,
        yu : playerUnit.y + playerUnit.height
    };
    for(m of monsters){
        const mw = {
            xd : m.x,
            xu : m.x + m.width,
            yd : m.y,
            yu : m.y + m.height
        };

        
        if((((mw.xd < p.xd) && (p.xd < mw.xu)) || ((mw.xd < p.xu) && (p.xu < mw.xu))) && 
           (((mw.yd < p.yd) && (p.yd < mw.yu)) || ((mw.yd < p.yu) && (p.yu < mw.yu)))){
            
        //     console.log('p', p.xd, p.xu, p.yd, p.yu);
        // console.log('m', mw.xd, mw.xu, mw.yd, mw.yu);      
            const agl = Math.atan2(playerUnit.x - m.x, m.y - playerUnit.y ) * 180 / Math.PI;
            
            if(m.moveStatus != ' none'){
                
                playerUnit.hp -= m.atk - playerUnit.def/4;
                playerUnit.x += Math.sin(agl*0.017453) * (m.oX_speed * 10.2);
                playerUnit.y -= Math.cos(agl*0.017453) * (m.oY_speed * 10.2);
                
                if(playerUnit.hp < 0){
                    for(i=9; i<13; i++) inventory[i] = {};
                    isPause = true;

                }
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