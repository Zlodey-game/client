function setUIBoxes(){
    mainBox = {
        width : canvas.width * 0.34,
        height : canvas.height * 0.12,
        radius : canvas.width * 0.01,
        lineWidth : canvas.width * 0.008
    };
    mainBar = {
        width : mainBox.width * 0.93,
        height : mainBox.height * 0.1,
        radius : mainBox.radius * 0.1,
        lineWidth : mainBox.lineWidth * 0.4
    };
    inven = {
        len : mainBox.width * 0.07,
        radius : mainBox.radius * 0.1,
        lineWidth : mainBox.lineWidth * 0.6 
    };

    statBox = {
        width : canvas.width * 0.2,
        height : canvas.height * 0.12,
        radius : canvas.width * 0.01,
        lineWidth : canvas.width * 0.008
    }
    statBar = {
        width : statBox.width * 0.4,
        height : statBox.height * 0.25,
        radius : statBox.radius * 0.1,
        lineWidth : 0
    };
    LVupBox = {  
        width : statBox.width ,
        height : statBox.height * 0.5,
        radius : canvas.width * 0.01,
        lineWidth : canvas.width * 0.008
    }

    invenBox = {
        width : canvas.width * 0.2,
        height : canvas.height * 0.18,
        radius : canvas.width * 0.01,
        lineWidth : canvas.width * 0.008
    };
}

function drawMonsterHPBar(emptyfill, fill, line, info){
    const move1 = {
        x : info.x,
        y : info.y - canvas.height*0.005
    }
    const value = info.hp / info.maxHp * 100;
    const height = info.height*0.06;
    const lineWidth = height * 0.7 
    const radius = canvas.width * 0.001;
    //console.log(value);

    bufferCtx.translate(move1.x, move1.y);
    //bufferCtx.translate( (pInfo.width - info.width)/2 , (pInfo.height * height - info.height));

    bufferCtx.beginPath();
    bufferCtx.moveTo(0, radius);
    bufferCtx.quadraticCurveTo(0, 0, radius, 0);
    bufferCtx.lineTo(info.width - radius, 0);
    bufferCtx.quadraticCurveTo(info.width, 0, info.width, radius);
    bufferCtx.lineTo(info.width, height-radius);
    bufferCtx.quadraticCurveTo(info.width, height, info.width - radius, height);
    bufferCtx.lineTo(radius, height);
    bufferCtx.quadraticCurveTo(0, height, 0, height-radius);
    bufferCtx.lineTo(0, radius);

    bufferCtx.strokeStyle = line;        // set the color for the circle to 'green'
    bufferCtx.lineWidth = lineWidth;  
    bufferCtx.stroke();
    bufferCtx.fillStyle = emptyfill;  
    bufferCtx.fill();

    
    bufferCtx.beginPath();
    bufferCtx.moveTo(0, radius);
    bufferCtx.quadraticCurveTo(0, 0, radius, 0);
    bufferCtx.lineTo(info.width*value*0.01 - radius, 0);
    bufferCtx.quadraticCurveTo(info.width*value*0.01, 0, info.width*value*0.01, radius);
    bufferCtx.lineTo(info.width*value*0.01, height-radius);
    bufferCtx.quadraticCurveTo(info.width*value*0.01, height, info.width*value*0.01 - radius, height);
    bufferCtx.lineTo(radius, height);
    bufferCtx.quadraticCurveTo(0, height, 0, height-radius);
    bufferCtx.lineTo(0, info.radius);

    bufferCtx.fillStyle = fill;  
    bufferCtx.fill();

    bufferCtx.translate(-move1.x, -move1.y);
}

function drawUnit(unit, img = undefined){
    if(img == undefined){
        bufferCtx.beginPath();
        bufferCtx.arc(unit.x + unit.width / 2, unit.y + unit.height / 2, unit.width / 2, 0, (Math.PI/180)*360, 1);
        bufferCtx.fillStyle = '#F8C574';
        bufferCtx.strokeStyle = '#352C17'

        bufferCtx.fill();
        let move1 = {
            x : unit.x + unit.width / 2,
            y : unit.y + unit.width / 2
        };

        bufferCtx.translate(move1.x, move1.y);
        bufferCtx.rotate((Math.PI/180)*unit.agl);
        bufferCtx.beginPath();
        bufferCtx.arc(-unit.width / 2.5, -unit.width / 2, unit.width * 0.2, 0,(Math.PI/180)*360, 1);
        bufferCtx.fill()
        bufferCtx.stroke();
        bufferCtx.beginPath();
        bufferCtx.arc( unit.width / 2.5, -unit.width / 2, unit.width * 0.2, 0,(Math.PI/180)*360, 1);
        bufferCtx.fill();
        bufferCtx.stroke();

        bufferCtx.rotate((Math.PI/180)*-unit.agl);
        bufferCtx.translate(-move1.x, -move1.y);
    }
    else{
        bufferCtx.drawImage(img, //Source Image
            unit.x, unit.y, //View Position
            unit.width, unit.height //View Size
        );
    }
}

function drawEquipment(fill, line, info, pInfo, idx, img){
    const move1 = {
        x : canvas.width - pInfo.width,
        y : canvas.height - pInfo.height
    };
    const move2 = {
        x : (((pInfo.width - info.len)/2) - ((info.len + info.lineWidth + info.len * 0.6) * (idx-1.5))),
        y : (pInfo.height * 0.4 - info.len)
    };

    bufferCtx.translate(move1.x, move1.y);
    bufferCtx.translate(move2.x, move2.y);

    bufferCtx.beginPath();
    bufferCtx.moveTo(0, info.radius);
    bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
    bufferCtx.lineTo(info.len - info.radius, 0);
    bufferCtx.quadraticCurveTo(info.len, 0, info.len, info.radius);
    bufferCtx.lineTo(info.len, info.len-info.radius);
    bufferCtx.quadraticCurveTo(info.len, info.len, info.len - info.radius, info.len);
    bufferCtx.lineTo(info.radius, info.len);
    bufferCtx.quadraticCurveTo(0, info.len, 0, info.len - info.radius);
    bufferCtx.lineTo(0, info.radius);

    bufferCtx.strokeStyle = line;        // set the color for the circle to 'green'
    bufferCtx.lineWidth = info.lineWidth;  
    bufferCtx.stroke();
    
    bufferCtx.fillStyle = fill;  
    bufferCtx.fill();
    
    if(img != null){
        bufferCtx.drawImage(img, 0, 0, info.len, info.len);
    }

    bufferCtx.translate(-move1.x, -move1.y);
    bufferCtx.translate(-move2.x, -move2.y);
}

function drawInvenBox(fill, line, info){
    const move1 = {
        x : canvas.width - info.width,
        y : canvas.height - info.height
    };

    bufferCtx.translate(move1.x, move1.y);
    // bufferCtx.fillStyle = "#ffffff";  
    // bufferCtx.fillRect (0, 0, box.width, box.height);
    bufferCtx.beginPath();
    bufferCtx.moveTo(0, info.radius);
    bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
    bufferCtx.lineTo(info.width, 0);
    bufferCtx.lineTo(info.width, info.height);
    bufferCtx.lineTo(0, info.height);
    bufferCtx.lineTo(0, info.radius);
    
    bufferCtx.strokeStyle = line;        // set the color for the circle to 'green'
    bufferCtx.lineWidth = info.lineWidth;  
    bufferCtx.stroke();
    bufferCtx.fillStyle = fill;  
    bufferCtx.fill();
    
    //bufferCtx.translate( -(canvas.width - info.width)/2 , -canvas.height + info.height);
    bufferCtx.translate(-move1.x, -move1.y);
}

function drawLVup(fill, line, info, pInfo, num){
    const move1 = {
        x : 0,
        y : canvas.height - info.height - info.lineWidth*0.5 - pInfo.height
    };

    bufferCtx.translate(move1.x, move1.y);
    
    bufferCtx.beginPath();
    bufferCtx.moveTo(0, 0);
    bufferCtx.lineTo(info.width - info.radius, 0);
    bufferCtx.quadraticCurveTo(info.width, 0, info.width, info.radius);

    bufferCtx.lineTo(info.width, info.height);
    bufferCtx.lineTo(info.width, info.height-info.radius);
    bufferCtx.quadraticCurveTo(info.width, info.height, info.width - info.radius, info.height);
    bufferCtx.lineTo(0, info.height);
    bufferCtx.lineTo(0, 0);
    
    bufferCtx.strokeStyle = line;        // set the color for the circle to 'green'
    bufferCtx.lineWidth = info.lineWidth;  
    bufferCtx.stroke();
    bufferCtx.fillStyle = fill;
    bufferCtx.fill();

    bufferCtx.fillStyle = "#e9e9e9";  
    bufferCtx.font = `medium ${info.height*0.4}px Noto Sans KR`;
    bufferCtx.fillText('남은 포인트', info.width*0.15, (info.height - info.height*0.25)/1.2);

    bufferCtx.fillStyle = "#FFB801";  
    bufferCtx.font = `bold ${info.height*0.45}px Noto Sans KR`;
    bufferCtx.fillText(num, info.width*0.65, (info.height - info.height*0.21)/1.2);
    
    bufferCtx.translate(-move1.x, -move1.y);
}

function drawStat(text, value, fill, info, pInfo, idx){
    const Y_which = [-1, -1, 0, 0, 1, 1];
    const X_which = [-(pInfo.width - info.width)*0.4, (pInfo.width - info.width)*0.4];

    const move1 = {
        x : 0,
        y : canvas.height - pInfo.height
    };
    const move2 = {
        x : ((pInfo.width - info.width)/2 + X_which[idx%2]),
        y : ((((pInfo.height - pInfo.lineWidth) - info.height)/1.2) + ((info.height + info.lineWidth) * Y_which[idx]))
    };

    bufferCtx.translate(move1.x, move1.y);
    bufferCtx.translate(move2.x, move2.y);
    
    bufferCtx.font = `bold ${info.height*0.7}px Noto Sans KR`;
    bufferCtx.fillStyle = fill;  
    bufferCtx.fillText(text, 0, (info.height - info.height*0.8)/2);

    bufferCtx.translate(info.width*0.35, 0);
    bufferCtx.fillText(value, 0, (info.height - info.height*0.8)/2);
    bufferCtx.translate(-info.width*0.35, 0);
    
    bufferCtx.translate(-move1.x, -move1.y);
    bufferCtx.translate(-move2.x, -move2.y);
}

function drawStatBox(fill, line, info){
    const move1 = {
        x : 0,
        y : canvas.height - info.height
    };

    bufferCtx.translate(move1.x, move1.y);
    // bufferCtx.fillStyle = "#ffffff";  
    // bufferCtx.fillRect (0, 0, box.width, box.height);
    bufferCtx.beginPath();
    bufferCtx.moveTo(0, 0);
    //bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
    bufferCtx.lineTo(info.width - info.radius, 0);
    bufferCtx.quadraticCurveTo(info.width, 0, info.width, info.radius);

    bufferCtx.lineTo(info.width, info.height);
    bufferCtx.lineTo(0, info.height);
    //bufferCtx.lineTo(box.width, box.height-box.radius);
    //bufferCtx.quadraticCurveTo(box.width, box.height, box.width - box.radius, box.height);
    //bufferCtx.lineTo(box.radius, box.height);
    //bufferCtx.quadraticCurveTo(0, box.height, 0, box.height-box.radius);
    bufferCtx.lineTo(0, 0);
    // bufferCtx.quadraticCurveTo(125, 25, 75, 25);
    bufferCtx.strokeStyle = line;        // set the color for the circle to 'green'
    bufferCtx.lineWidth = info.lineWidth;  
    bufferCtx.stroke();
    bufferCtx.fillStyle = fill;  
    bufferCtx.fill();
    
    //bufferCtx.translate( -(canvas.width - info.width)/2 , -canvas.height + info.height);
    bufferCtx.translate(-move1.x, -move1.y);
}

function drawInven(fill, line, info, pInfo, idx){
    const move1 = {
        x : (canvas.width - pInfo.width)/2,
        y : canvas.height - pInfo.height
    };
    const move2 = {
        x : (((pInfo.width - info.len)/2) - ((info.len + info.lineWidth + info.len * 0.2) * (4-idx))),
        y : (pInfo.height * 0.47 - info.len)
    };

    bufferCtx.translate(move1.x, move1.y);
    bufferCtx.translate(move2.x, move2.y);

    bufferCtx.beginPath();
    bufferCtx.moveTo(0, info.radius);
    bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
    bufferCtx.lineTo(info.len - info.radius, 0);
    bufferCtx.quadraticCurveTo(info.len, 0, info.len, info.radius);
    bufferCtx.lineTo(info.len, info.len-info.radius);
    bufferCtx.quadraticCurveTo(info.len, info.len, info.len - info.radius, info.len);
    bufferCtx.lineTo(info.radius, info.len);
    bufferCtx.quadraticCurveTo(0, info.len, 0, info.len - info.radius);
    bufferCtx.lineTo(0, info.radius);

    bufferCtx.strokeStyle = line;        // set the color for the circle to 'green'
    bufferCtx.lineWidth = info.lineWidth;  
    bufferCtx.stroke();
    
    bufferCtx.fillStyle = fill;  
    bufferCtx.fill();
    
    bufferCtx.translate(-move1.x, -move1.y);
    bufferCtx.translate(-move2.x, -move2.y);

    
}

function drawInvenItem(fill, line, info, pInfo, idx, item){
    const move1 = {
        x : (canvas.width - pInfo.width)/2,
        y : canvas.height - pInfo.height
    };
    const move2 = {
        x : (((pInfo.width - info.len)/2) - ((info.len + info.lineWidth + info.len * 0.2) * (4-idx))),
        y : (pInfo.height * 0.47 - info.len)
    };

    if(item != undefined){
        //console.log(item);
        //bufferCtx.fillStyle = '#333';  
        //bufferCtx.fill();
        if(item.id == undefined){

        }
        else if(item.clicked != true){
            bufferCtx.translate(move1.x, move1.y);
            bufferCtx.translate(move2.x, move2.y);
            bufferCtx.drawImage(items[item.id], 0, 0, info.len, info.len);
            bufferCtx.translate(-move1.x, -move1.y);
            bufferCtx.translate(-move2.x, -move2.y);
        }
        else{
            bufferCtx.drawImage(items[item.id], pointer.x - inven.len/2, pointer.y - inven.len/2, info.len, info.len);
        }
        
    }
}

function drawMainBox(fill, line, info){
    const move1 = {
        x : (canvas.width - info.width)/2,
        y : canvas.height - info.height
    };

    bufferCtx.translate(move1.x, move1.y);
    
    bufferCtx.beginPath();
    bufferCtx.moveTo(0, info.radius);
    bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
    bufferCtx.lineTo(info.width - info.radius, 0);
    bufferCtx.quadraticCurveTo(info.width, 0, info.width, info.radius);
    bufferCtx.lineTo(info.width, info.height);
    bufferCtx.lineTo(0, info.height);
    bufferCtx.lineTo(0, info.radius);
    
    bufferCtx.strokeStyle = line;        // set the color for the circle to 'green'
    bufferCtx.lineWidth = info.lineWidth;  
    bufferCtx.stroke();
    bufferCtx.fillStyle = fill;  
    bufferCtx.fill();
    
    bufferCtx.translate( -move1.x, -move1.y);
}

function drawMainBar(emptyfill, fill, line, info, pInfo, height, value){
    const move1 = {
        x : (canvas.width - pInfo.width)/2,
        y : canvas.height - pInfo.height
    };
    const move2 = {
        x : (pInfo.width - info.width)/2,
        y : (pInfo.height * height - info.height)
    };

    bufferCtx.translate(move1.x, move1.y);
    bufferCtx.translate(move2.x, move2.y);

    bufferCtx.beginPath();
    bufferCtx.moveTo(0, info.radius);
    bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
    bufferCtx.lineTo(info.width - info.radius, 0);
    bufferCtx.quadraticCurveTo(info.width, 0, info.width, info.radius);
    bufferCtx.lineTo(info.width, info.height-info.radius);
    bufferCtx.quadraticCurveTo(info.width, info.height, info.width - info.radius, info.height);
    bufferCtx.lineTo(info.radius, info.height);
    bufferCtx.quadraticCurveTo(0, info.height, 0, info.height-info.radius);
    bufferCtx.lineTo(0, info.radius);

    bufferCtx.strokeStyle = line;        // set the color for the circle to 'green'
    bufferCtx.lineWidth = info.lineWidth;  
    bufferCtx.stroke();
    bufferCtx.fillStyle = emptyfill;  
    bufferCtx.fill();

    if(value != 0 || value != null){
        if(value > 100) value = 100;
        if(value < 0) value = 0;
        bufferCtx.beginPath();
        bufferCtx.moveTo(0, info.radius);
        bufferCtx.quadraticCurveTo(0, 0, info.radius, 0);
        bufferCtx.lineTo(info.width*value*0.01 - info.radius, 0);
        bufferCtx.quadraticCurveTo(info.width*value*0.01, 0, info.width*value*0.01, info.radius);
        bufferCtx.lineTo(info.width*value*0.01, info.height-info.radius);
        bufferCtx.quadraticCurveTo(info.width*value*0.01, info.height, info.width*value*0.01 - info.radius, info.height);
        bufferCtx.lineTo(info.radius, info.height);
        bufferCtx.quadraticCurveTo(0, info.height, 0, info.height-info.radius);
        bufferCtx.lineTo(0, info.radius);

        bufferCtx.fillStyle = fill;  
        bufferCtx.fill();
    }

    bufferCtx.fillStyle = fill;  
    bufferCtx.fill();

    bufferCtx.translate(-move1.x, -move1.y);
    bufferCtx.translate(-move2.x, -move2.y);
}

function drawRoad(){
    var width = canvas.width;
    var height = canvas.height;
    bufferCtx.drawImage(asphalt, 0, 0, width, height);

    bufferCtx.fillStyle = "rgb(206, 206, 206)";
    // Left
    bufferCtx.beginPath();
    bufferCtx.moveTo(0,0);
    bufferCtx.lineTo(canvas.width*0.065,0);
    bufferCtx.lineTo(0,height*0.7);
    bufferCtx.closePath();
    bufferCtx.fill();
    // Right
    bufferCtx.beginPath();
    bufferCtx.moveTo(width,0);
    bufferCtx.lineTo(width - width*0.065,0);
    bufferCtx.lineTo(width,height*0.7);
    bufferCtx.closePath();
    bufferCtx.fill();

    // 보도
    bufferCtx.fillStyle = "rgb(244, 177, 131)";
    // Left
    bufferCtx.beginPath();
    bufferCtx.moveTo(0,0);
    bufferCtx.lineTo(width*0.04,0);
    bufferCtx.lineTo(0,height*0.4);
    bufferCtx.closePath();
    bufferCtx.fill();
    // Right
    bufferCtx.beginPath();
    bufferCtx.moveTo(width,0);
    bufferCtx.lineTo(width - width*0.04,0);
    bufferCtx.lineTo(width,height*0.4);
    bufferCtx.closePath();
    bufferCtx.fill();

    // 중앙선
    bufferCtx.fillStyle = "rgb(255, 192, 0)";  
    bufferCtx.fillRect (width * 0.485 - (width*0.014)/2, 0, width*0.014, height);
    bufferCtx.fillRect (width * 0.515 - (width*0.014)/2, 0, width*0.014, height);

    const lineLen = height*0.208;
    const rightGap = height*0.152;
    // 차선
    bufferCtx.fillStyle = "rgb(255, 255, 255)"; 
    // Left
    bufferCtx.rotate((5/180)*Math.PI);
    for(let i=0; i<5; i++){
        bufferCtx.fillRect (width * 0.27 - (width*0.014)/2, lineLen * i, width*0.014, height*0.1);    
    }
    bufferCtx.rotate((-5/180)*Math.PI);
    // Right
    bufferCtx.rotate((-5/180)*Math.PI);
    for(let i=0; i<5; i++){
        bufferCtx.fillRect (width * (1-0.28) - (width*0.014)/2, rightGap + lineLen * i, width*0.014, height*0.1);    
    }
    bufferCtx.rotate((5/180)*Math.PI);
}